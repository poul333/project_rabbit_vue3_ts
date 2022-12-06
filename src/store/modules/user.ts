import { defineStore } from "pinia";
import request from "@/utils/request";
import { Profile } from "@/types/user";
import { ApiRes } from "@/types/data";

export default defineStore("user", {
  state() {
    return {
      // 个人信息
      profile: {} as Profile,
    };
  },
  actions: {
    // 用户名和密码登录
    async login(account: string, password: string) {
      const res = await request.post<ApiRes<Profile>>("/login", {
        account,
        password,
      });
      this.profile = res.data.result;
    },
    // 获取短信验证码
    async sendMobileCode(mobile: string) {
      await request.get("/login/code", {
        params: {
          mobile,
        },
      });
    },
  },
});
