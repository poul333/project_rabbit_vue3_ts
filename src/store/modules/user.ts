import { defineStore } from "pinia";
import request from "@/utils/request";
import { Profile } from "@/types/user";
import { ApiRes } from "@/types/data";
import { getProfile, setProfile, removeProfile } from "@/utils/storage";

export default defineStore("user", {
  state() {
    return {
      // 个人信息
      profile: getProfile() || {},
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
      // 存至本地
      setProfile(res.data.result);
    },
    // 获取短信验证码
    async sendMobileCode(mobile: string) {
      await request.get("/login/code", {
        params: {
          mobile,
        },
      });
    },
    // 短信登录接口
    async mobileLogin(mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>("/login/code", {
        mobile,
        code,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
    },

    // 退出登录
    logout() {
      this.profile = {} as Profile;
      removeProfile();
    },
  },
});
