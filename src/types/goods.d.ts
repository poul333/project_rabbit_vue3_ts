// 商品的详情类型
type GoodsDetail = {
  pictures: string[];
  properties: {
    name: string;
    value: string;
  }[];
};

// Sku类型,最小库存单元 => 决定是否禁用
export type Sku = {
  id: string;
  inventory: number;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: {
    name: string;
    valueName: string;
  }[];
};

// 规格按钮
export type SpecValue = {
  desc: string;
  name: string; // 黑色,白色
  picture: string;
  selected: boolean; // 是否选中
  disabled: boolean; // 是否禁用
};

// 规格的类型
export type Spec = {
  name: string; // 颜色
  values: SpecValue[];
};

// 商品模块的类型声明
export type GoodsInfo = {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: any[];
  videoScale: number;
  mainPictures: string[];
  isPreSale: boolean;
  isCollect?: any;
  recommends?: any;
  userAddresses?: any;
  evaluationInfo?: any;
  categories: {
    id: string;
    name: string;
  }[];
  specs: Spec[];
  skus: Sku[];
  details: GoodsDetail;
};
