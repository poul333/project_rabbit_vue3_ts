import { defineStore } from "pinia";

export default defineStore("goods", {
  state() {
    return {
      // 商品详细信息
      info: {},
    };
  },
});
