// 所有接口的通用类型
export interface ApiRes<T> {
  code: string;
  msg: string;
  result: T;
}

export interface GoodsItem {
  desc: string;
  id: string;
  name: string;
  picture: string;
  price: string;
}

// 单个分类的类型
export interface CategoryItem {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[]; // 结构与外层一样，可以使用递归
  goods: GoodsItem[];
  open: boolean; // 控制弹出层
}

// 轮播图数据类型
export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}

// 首页新鲜好物数据类型
export interface NewGoodItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  orderNum: number;
}

// 首页人气推荐数据类型
export interface HotGoods {
  id: string;
  picture: string;
  title: string;
  alt: string;
}

// 首页热门品牌数据类型
export type Brand = {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type?: any;
  desc: string;
  place: string;
};
