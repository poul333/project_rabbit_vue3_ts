export interface UserAddress {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: number
  fullLocation: string
  postalCode: string
  addressTags: string
}

export interface Good {
  id: string
  name: string
  picture: string
  count: number
  skuId: string
  attrsText: string
  price: string
  payPrice: string
  totalPrice: string
  totalPayPrice: string
}

export interface Summary {
  goodsCount: number
  totalPrice: number
  totalPayPrice: number
  postFee: number
  discountPrice: number
}

// 生成订单
export interface CheckoutInfo {
  userAddresses: UserAddress[]
  goods: Good[]
  summary: Summary
}
