import { defineStore } from "pinia";
import request from "@/utils/request";
import { ApiRes, CategoryItem } from "@/types/data";
import { topCategory } from "../constants";
const defaultCategory = topCategory.map((item) => {
  return {
    name: item,
  };
});

export default defineStore("category", {
  state() {
    return {
      list: defaultCategory as CategoryItem[],
      // list: [] as CategoryItem[],
    };
  },

  getters: {},
  actions: {
    async getCategoryList() {
      const res = await request.get<ApiRes<CategoryItem[]>>(
        "/home/category/head"
      );
      // 对返回的数据新增open属性，用来控制一级分类弹出层
      res.data.result.forEach((item) => {
        item.open = false;
      });
      this.list = res.data.result;
    },

    show(id: string) {
      const itemObj = this.list.find((item) => item.id === id);
      itemObj!.open = true;
    },

    hide(id: string) {
      const itemObj = this.list.find((item) => item.id === id);
      itemObj!.open = false;
    },
  },
});
