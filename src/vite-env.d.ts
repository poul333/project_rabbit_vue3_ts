/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 对QC 包需要使用的方法进行类型注解  添加命名空间
declare namespace QC {
  type callbackFn = (openId: string) => void;
  const Login: {
    signOut: () => void; // 退出
    check: () => boolean; // 检查QQ是否登录成功
    getMe: (callback: callbackFn) => void;
  };
  const api: (api: "get_user_info") => {
    success: any;
  };
}
