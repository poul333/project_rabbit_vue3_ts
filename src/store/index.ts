import useCategoryStore from "./modules/category";
import useHomeStore from "./modules/home";
import useGoodsStore from "./modules/goods";
import useUserStore from "./modules/user";
import useCartStore from "./modules/cart";
import useCheckoutStore from "./modules/checkout";

export default function useStore() {
  return {
    category: useCategoryStore(),
    home: useHomeStore(),
    goods: useGoodsStore(),
    user: useUserStore(),
    cart: useCartStore(),
    checkout: useCheckoutStore(),
  };
}
