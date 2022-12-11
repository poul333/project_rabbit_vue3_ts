import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // 引入pinia本地存储包
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import "@/assets/styles/common.less";
import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxUI from "./components";
// import XtxCarousel from "@/components/carousel/index.vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // pinia数据持久化

app.component("XtxSkeleton", XtxSkeleton);
app.use(XtxUI);
// app.component(XtxCarousel.name, XtxCarousel);

app.use(router);
app.use(pinia);
app.mount("#app");
