import { defineStore } from "pinia";
import request from "@/utils/request";
import { BannerItem, ApiRes, NewGoodItem, HotGoods } from "@/types/data";
export default defineStore("home", {
  state() {
    return {
      bannerList: [] as BannerItem[],
      newGoodList: [] as NewGoodItem[],
      hotGoodList: [] as HotGoods[],
    };
  },
  getters: {},
  actions: {
    async getBannerList() {
      const res = await request.get<ApiRes<BannerItem[]>>("/home/banner");
      this.bannerList = res.data.result;
    },

    async getNewList() {
      const res = await request.get<ApiRes<NewGoodItem[]>>("/home/new");
      this.newGoodList = res.data.result;
    },

    async getHotList() {
      const res = await request.get<ApiRes<HotGoods[]>>("/home/hot");
      this.hotGoodList = res.data.result;
    },
  },
});
