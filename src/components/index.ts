// 插件文件，统一注册全局组件, 自定义全局指令
// import XtxSkeleton from "@/components/skeleton/index.vue";
import { useIntersectionObserver } from "@vueuse/core";
import XtxCarousel from "./carousel/index.vue";
import XtxMore from "./more/index.vue";
import { App } from "vue";
import DefaultImg from "@/assets/images/200.png";
export default {
  install(app: App) {
    // 构建组件
    // app.component("XtxSkeleton", XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);

    // 构建自定义指令
    // 图片懒加载 v-lazy 指令
    app.directive("lazy", {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            stop(); // 停止监听
            el.src = binding.value; // 给绑定的元素设置src属性
            // 如果加载失败,则显示默认图片
            el.onerror = () => {
              el.src = DefaultImg;
            };
          }
        });
      },
    });
  },
};
