// GlobalComponents for Volar
import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";

// declare module "@vue/runtime-core" {
declare module "vue" {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
    XtxMore: typeof XtxMore;
  }
}
