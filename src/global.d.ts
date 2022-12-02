// GlobalComponents for Volar
import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import XtxBread from "@/components/bread/index.vue";
import XtxBreadItem from "@/components/bread/item.vue";

// declare module "@vue/runtime-core" {
declare module "vue" {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
    XtxMore: typeof XtxMore;
    XtxBread: typeof XtxBread;
    XtxBreadItem: typeof XtxBreadItem;
  }
}
