import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

// 封装组件数据懒加载
export function useLazyData(apiFn: () => void) {
  const target = ref(null);
  // 组件数据懒加载
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      // 是否进入可视区
      if (isIntersecting) {
        stop(); // 停止监听
        apiFn(); // 发送请求获取数据
      }
    },
    {
      threshold: 0,
    }
  );
  return target;
}
