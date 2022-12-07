// 购物车模块
import { defineStore } from "pinia";
import request from "@/utils/request";
import { ApiRes } from "@/types/data";
import { CartItem } from "@/types/cart";

export default defineStore("cart", {
  state() {
    return {
      // 购物车列表
      list: [] as CartItem[],
    };
  },

  getters: {
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
  },

  actions: {
    // 获取购物车列表
    async getCartList() {
      const res = await request.get<ApiRes<CartItem[]>>("/member/cart");
      this.list = res.data.result;
    },

    // 加入购物车
    async addCart(data: { skuId: string; count: number }) {
      await request.post("/member/cart", data);
      //   重新获取购物车列表
      this.getCartList();
    },

    // 删除购物车
    async deleteCart(skuIds: string[]) {
      await request.delete("/member/cart", {
        data: {
          ids: skuIds,
        },
      });
      this.getCartList();
    },
  },
});
