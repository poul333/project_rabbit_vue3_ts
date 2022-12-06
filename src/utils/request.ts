import Message from "@/components/message";
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
      Message.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
