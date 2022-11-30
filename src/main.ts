import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import "@/assets/styles/common.less";
import XTXSkeleeton from "@/components/skeleton/index.vue";
import XtxUI from './components'
// import XtxCarousel from "@/components/carousel/index.vue";

const app = createApp(App);
const pinia = createPinia();

app.component("XTXSkeleeton", XTXSkeleeton);
app.use(XtxUI)
// app.component(XtxCarousel.name, XtxCarousel);

app.use(router);
app.use(pinia);
app.mount("#app");
