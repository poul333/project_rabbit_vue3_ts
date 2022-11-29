import useCategoryStore from "./modules/category";

export default function useStore() {
  return {
    category: useCategoryStore(),
  };
}
