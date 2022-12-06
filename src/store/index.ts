import useCategoryStore from "./modules/category";
import useHomeStore from "./modules/home";
import useGoodsStore from "./modules/goods";
import useUserStore from "./modules/user";

export default function useStore() {
  return {
    category: useCategoryStore(),
    home: useHomeStore(),
    goods: useGoodsStore(),
    user: useUserStore(),
  };
}
