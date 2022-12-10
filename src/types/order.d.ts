// 订单信息类型
export interface OrderPayInfo {
  id: string;
  createTime: string;
  payType: number;
  orderState: number;
  payLatestTime: string;
  countdown: number;
  postFee: number;
  payMoney: number;
  payChannel: number;
  totalMoney: number;
  totalNum: number;
  deliveryTimeType: number;
  receiverContact: string;
  receiverMobile: string;
  provinceCode: string;
  cityCode: string;
  countyCode: string;
  receiverAddress: string;
  payTime?: any;
  consignTime?: any;
  endTime?: any;
  closeTime?: any;
  evaluationTime?: any;
  skus: {
    id: string;
    spuId: string;
    name: string;
    quantity: number;
    image: string;
    realPay: number;
    curPrice: number;
    totalMoney?: any;
    properties: {
      propertyMainName: string;
      propertyValueName: string;
    }[];
    attrsText: string;
  }[];
  arrivalEstimatedTime?: any;
}
