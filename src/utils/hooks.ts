import { useIntersectionObserver, useIntervalFn } from "@vueuse/core";
import { ref, onUnmounted } from "vue";

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

// 封装倒计时hook
export function useCountDown(count: number = 60) {
  const time = ref(0); // 倒计时秒数
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--;
      if (time.value <= 0) pause();
    },
    1000,
    {
      immediate: false, // 默认关闭
    }
  );

  // 实现验证码倒计时
  const start = () => {
    time.value = count;
    resume();
  };

  // 组件被卸载，清除定时器
  onUnmounted(() => {
    pause();
  });

  return {
    time,
    resume,
    start,
  };
}
