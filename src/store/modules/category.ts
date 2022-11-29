import { defineStore } from "pinia";
import request from "@/utils/request";
import { ApiRes, CategoryItem } from "@/types/data";

export default defineStore("category", {
  state() {
    return {
      list: [] as CategoryItem[],
    };
  },
  getters: {},
  actions: {
    async getCategoryList() {
      const res = await request.get<ApiRes<CategoryItem[]>>(
        "/home/category/head"
      );
      this.list = res.data.result;
    },
  },
});
