import Message from "@/components/message";
import useStore from "@/store";
import axios, { AxiosError } from "axios";

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const instance = axios.create({
  // 请求基地址
  // baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net/",
  baseURL: "http://pcapi-xiaotuxian-front.itheima.net/",
  // 请求超时时间
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 请求头携带token
    const { user } = useStore();
    // 如果token存在，携带token
    if (user.profile.token) {
      config.headers!.Authorization = `Bearer ${user.profile.token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  // axios的请求错误类型：AxiosError
  function (error: AxiosError<{ message: string; code: string }>) {
    // 处理响应错误
    // 特殊情况：响应未回来
    if (!error.response) {
      Message.error("网络异常，请稍后再试");
    } else {
      // 有响应，正常给错误提示信息
      // {message: "三方登录失败", code: "501"}
      const { code, message } = error.response.data;
      if (code === "501" && message === "三方登录失败") {
        Message.warning("当前QQ号未与平台账号关联");
      } else {
        Message.error(error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
