// 插件文件，统一注册全局组件, 自定义全局指令
// import XtxSkeleton from "@/components/skeleton/index.vue";
import { useIntersectionObserver } from "@vueuse/core";
import XtxCarousel from "./carousel/index.vue";
import XtxMore from "./more/index.vue";
import { App } from "vue";
import DefaultImg from "@/assets/images/200.png";
import Bread from "./Bread/index.vue";
import BreadItem from "./Bread/Item.vue";
import XtxCity from "./city/index.vue";
import XtxNumbox from "./numbox/index.vue";
import XtxButton from "./button/index.vue";
import XtxCheckbox from "./checkbox/index.vue";
import XtxMessage from "./message/message.vue";

export default {
  install(app: App) {
    // 构建组件
    // app.component("XtxSkeleton", XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.component(Bread.name, Bread);
    app.component(BreadItem.name, BreadItem);
    app.component(XtxCity.name, XtxCity);
    app.component(XtxNumbox.name, XtxNumbox);
    app.component(XtxButton.name, XtxButton);
    app.component(XtxCheckbox.name, XtxCheckbox);
    app.component(XtxMessage.name, XtxMessage);

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
