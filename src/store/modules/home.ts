import { defineStore } from "pinia";
import request from "@/utils/request";
import {
  BannerItem,
  ApiRes,
  NewGoodItem,
  HotGoods,
  Brand,
  HomeProduct,
  Special,
} from "@/types/data";
export default defineStore("home", {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newGoodList: [] as NewGoodItem[],
      hotGoodList: [] as HotGoods[],
      brandList: [] as Brand[],
      productList: [] as HomeProduct[],
      specialList: [] as Special[],
    };
  },
  getters: {},
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>("/home/banner");
      this.bannerList = res.data.result;
    },

    async getNewList() {
      // 开启定时器查看骨架屏效果
      setTimeout(async () => {
        const res = await request.get<ApiRes<NewGoodItem[]>>("/home/new");
        this.newGoodList = res.data.result;
      }, 500);
    },

    async getHotList() {
      setTimeout(async () => {
        const res = await request.get<ApiRes<HotGoods[]>>("/home/hot");
        this.hotGoodList = res.data.result;
      }, 500);
    },

    async getBrandList() {
      setTimeout(async () => {
        const res = await request.get<ApiRes<Brand[]>>("/home/brand");
        this.brandList = res.data.result;
      }, 500);
    },

    async getProductList() {
      const res = await request.get<ApiRes<HomeProduct[]>>("/home/goods");
      this.productList = res.data.result;
    },

    async getSpecialList() {
      const res = await request.get<ApiRes<Special[]>>("/home/special");
      this.specialList = res.data.result;
    },
  },
});
