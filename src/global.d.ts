// GlobalComponents for Volar
import XtxSkeleton from "@/components/skeleton/index.vue";
import XtxCarousel from "@/components/carousel/index.vue";
import XtxMore from "@/components/more/index.vue";
import XtxBread from "@/components/bread/index.vue";
import XtxBreadItem from "@/components/bread/item.vue";
import XtxCity from "@/components/city/index.vue";
import XtxNumbox from "@/components/numbox/index.vue";
import XtxButton from "@/components/button/index.vue";
import XtxCheckbox from "@/components/checkbox/index.vue";
import XtxMessage from "@/components/message/message.vue";
import XtxDialog from "@/components/dialog/index.vue";
import XtxSwitch from "@/components/switch/index.vue";

// declare module "@vue/runtime-core" {
declare module "vue" {
  export interface GlobalComponents {
    XtxSkeleton: typeof XtxSkeleton;
    XtxCarousel: typeof XtxCarousel;
    XtxMore: typeof XtxMore;
    XtxBread: typeof XtxBread;
    XtxBreadItem: typeof XtxBreadItem;
    XtxCity: typeof XtxCity;
    XtxNumbox: typeof XtxNumbox;
    XtxButton: typeof XtxButton;
    XtxCheckbox: typeof XtxCheckbox;
    XtxMessage: typeof XtxMessage;
    XtxDialog: typeof XtxDialog;
    XtxSwitch: typeof XtxSwitch;
  }
}
