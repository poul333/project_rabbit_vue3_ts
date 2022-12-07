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
    // 短信登录
    async mobileLogin(mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>("/login/code", {
        mobile,
        code,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
    },
    // qq登录
    //  source: 1为pc，2为webapp，3为微信小程序, 4为Android, 5为ios, 6为qq, 7为微信
    async qqLogin(openId: string) {
      const res = await request.post<ApiRes<Profile>>("/login/social", {
        unionId: openId,
        source: 6,
      });
      // 1. 保存用户信息到 state 中
      this.profile = res.data.result;
      setProfile(res.data.result);
    },
    // 提供绑定的 action 登录
    async qqBindLogin(openId: string, mobile: string, code: string) {
      const res = await request.post<ApiRes<Profile>>("/login/social/bind", {
        mobile,
        code,
        unionId: openId,
      });
      this.profile = res.data.result;
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
    // 绑定qq的短信验证码
    async sendQQBindMsg(mobile: string) {
      await request.get("/login/social/code", {
        params: {
          mobile,
        },
      });
    },

    // 无账号未绑定，获取验证码
    async sendQQPathMsg(mobile: string) {
      await request.get("/register/code", {
        params: {
          mobile,
        },
      });
    },
    // 无账号未绑定，完善信息进行绑定
    async qqPatchLogin(data: any) {
      const res = await request.post<ApiRes<Profile>>(
        `/login/social/${data.openId}/complement`,
        data
      );
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
