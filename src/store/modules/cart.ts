// 购物车模块
import { defineStore } from "pinia";
import request from "@/utils/request";
import { ApiRes } from "@/types/data";
import { CartItem } from "@/types/cart";
import useStore from "..";

// 本地获取购物车信息类型
type CheckObj = {
  isEffective: boolean;
  nowPrice: number;
  stock: number;
};

export default defineStore("cart", {
  state() {
    return {
      // 购物车列表
      list: [] as CartItem[],
    };
  },

  // pinia本地存储
  persist: {
    key: "rabbit_cart",
  },

  getters: {
    // 标记是否登录
    isLogin(): boolean {
      const { user } = useStore();
      return !!user?.profile?.token;
    },

    // 基于原有的数据，筛选出有效的购物车列表 => isEffective：true
    effectiveList(): CartItem[] {
      return this.list.filter((item) => item.isEffective && item.stock > 0);
    },

    // 有效商品的总数量
    effectiveListCounts(): number {
      return this.effectiveList.reduce(
        (prev, item, index) => prev + item.count,
        0
      );
    },

    // 有效商品的总价格
    effectiveListPrice(): string {
      let totalPrice = this.effectiveList.reduce(
        (prev, item, index) => prev + item.count * +item.price,
        0
      );
      return totalPrice.toFixed(2);
    },

    // 统计是否全选，设置是否全选
    isAllSelected(): boolean {
      return (
        this.effectiveList.every((item) => item.selected) &&
        this.effectiveList.length !== 0
      );
    },

    // 已选择的列表
    selectedList(): CartItem[] {
      return this.effectiveList.filter((item) => item.selected);
    },
    // 已选择的总数
    selectedListCounts(): number {
      return this.selectedList.reduce((prev, item) => prev + item.count, 0);
    },
    // 已选择的总价
    selectedListPrice(): string {
      return this.selectedList
        .reduce((prev, item) => prev + item.count * +item.nowPrice, 0)
        .toFixed(2);
    },
  },

  actions: {
    // 获取购物车列表
    async getCartList() {
      if (this.isLogin) {
        const res = await request.get<ApiRes<CartItem[]>>("/member/cart");
        this.list = res.data.result;
      } else {
        // 本地获取操作
        this.list.forEach(async (cartItem) => {
          const skuId = cartItem.skuId;
          const res = await request.get<ApiRes<CheckObj>>(
            `/goods/stock/${skuId}`
          );
          // 更新商品现价
          const cartItemInfo = res.data.result;
          cartItem.nowPrice = (+cartItemInfo.nowPrice).toFixed(2);
          cartItem.stock = cartItemInfo.stock;
          cartItem.isEffective = cartItemInfo.isEffective;
        });
      }
    },

    // 加入购物车
    async addCart(data: CartItem) {
      if (this.isLogin) {
        await request.post("/member/cart", {
          skuId: data.skuId,
          count: data.count,
        });
        //   重新获取购物车列表
        this.getCartList();
      } else {
        const goods = this.list.find((item) => item.skuId === data.skuId);
        // 1. 已存在，数量上累加
        if (goods) {
          goods.count += data.count;
        } else {
          // 2. 商品不存在，新增商品到数组中
          this.list.unshift(data);
        }
      }
    },

    // 删除购物车
    async deleteCart(skuIds: string[]) {
      // 判断是否登录
      if (this.isLogin) {
        await request.delete("/member/cart", {
          data: {
            ids: skuIds,
          },
        });
        this.getCartList();
      } else {
        // 只要在skuIds 数组中存在，就都删除
        this.list = this.list.filter((item) => !skuIds.includes(item.skuId));
      }
    },

    // 修改更新购物车商品 (数量，选中状态)
    async updateCart(
      skuId: string,
      data: { selected?: boolean; count?: number }
    ) {
      // 判断是否登录
      if (this.isLogin) {
        await request.put(`/member/cart/${skuId}`, data);
        this.getCartList();
      } else {
        // 未登录，找到该商品，本地修改
        const goods = this.effectiveList.find((item) => item.skuId === skuId);
        if (data.selected !== undefined) {
          goods!.selected = data.selected;
        }
        if (data.count !== undefined) {
          goods!.count = data.count;
        }
      }
    },

    // 全选或取消全选
    async updateCartAllSelected(isSelected: boolean) {
      if (this.isLogin) {
        await request.put("/member/cart/selected", {
          selected: isSelected,
        });
        // 获取最新购物车列表
        this.getCartList();
      } else {
        this.list.forEach((item) => (item.selected = isSelected));
      }
    },

    // 退出时清空本地购物车列表
    clearCart() {
      this.list = [];
    },

    // 合并购物车 （只会在登录成功后调用）
    async mergeLocalCart() {
      // 对现有的list进行整理，发送请求
      const data = this.list.map((item) => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count,
        };
      });
      // 合并购物车
      await request.post("/member/cart/merge", data);
      // 合并成功，重新获取购物车列表
      this.getCartList();
    },
  },
});
