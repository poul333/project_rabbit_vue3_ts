// 插件文件，统一注册全局组件
// import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "./carousel/index.vue";
import XtxMore from "./more/index.vue";
import { App } from "vue";
export default {
  install(app: App) {
    // app.component("XtxSkeleton", XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
  },
};
