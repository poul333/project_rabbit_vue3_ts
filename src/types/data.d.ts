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
// export interface CateGoodsItem {
//   desc: string;
//   id: string;
//   name: string;
//   picture: string;
//   price: string;
// }

export interface CateGoodsItem {
  desc: string;
  id: string;
  name: string;
  picture: string;
  price: string;
  orderNum: number;
}
// export interface GoodItem {
//   desc: string;
//   id: string;
//   name: string;
//   picture: string;
//   price: string;
//   orderNum: number;
// }

// 单个分类的类型
export interface CategoryItem {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[]; // 结构与外层一样，可以使用递归
  goods: GoodsItem[];
  parentId: string;
  parentName: string;
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

// 首页商品区块数据类型
export type HomeProduct = {
  id: string;
  name: string;
  picture: string;
  saleInfo: string;
  children: {
    id: string;
    name: string;
  }[];
  goods: {
    id: string;
    name: string;
    desc: string;
    price: string;
    picture: string;
    discount?: any;
    orderNum: number;
  }[];
};

// 首页最新专题数据类型
export type Special = {
  creator: string;
  isDelete: number;
  createTime: string;
  updateTime: string;
  id: string;
  classificationId: string;
  title: string;
  summary: string;
  lowestPrice: number;
  cover: string;
  detailsUrl: string;
  collectNum: number;
  viewNum: number;
  replyNum: number;
};

// 顶级分类类型
export type TopCategory = {
  id: string;
  name: string;
  picture: string;
  children: CategoryItem[];
};

// 二级分类的数据类型
export type SaleProperty = {
  id: string;
  name: string;
  properties: {
    id: string;
    name: string;
  }[];
};

export type SubCategory = {
  id: string;
  name: string;
  picture?: any;
  parentId: string;
  parentName: string;
  brands: {
    id: string;
    name: string;
    nameEn: string;
    logo: string;
    picture: string;
    type?: any;
    desc: string;
    place: string;
  }[];
  saleProperties: SaleProperty[];
  goods: CateGoodsItem[];
};
