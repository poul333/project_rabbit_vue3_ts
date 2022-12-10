<script lang="ts" setup name="XtxPayCheckoutPage">
import Message from '@/components/message'

import useStore from '@/store'
import request from '@/utils/request'
import { useRouter } from 'vue-router'
import CheckoutAddress from './components/checkout-address.vue'
const router = useRouter()
const { checkout, cart } = useStore()
checkout.getCheckoutInfo()

const submitCheckout = async () => {
  // 如果地址为空，不能提交订单
  if (!checkout.showAddress) {
    return Message.warning('请选择收货地址')
  }
  const res = await request.post('/member/order', {
    goods: checkout.checkoutInfo.goods.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count,
      }
    }),
    addressId: checkout.showAddress.id,
  })
  // 成功提醒用户
  Message({ type: 'success', text: '下单成功~' })
  // 🔔重新获取购物车列表
  cart.getCartList()
  // 跳转到支付页面
  router.replace('/member/pay?id=' + res.data.result.id)
}
</script>

<template>
  <div class="xtx-pay-checkout-page" v-if="checkout.checkoutInfo.goods">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <CheckoutAddress></CheckoutAddress>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkout.checkoutInfo.goods" :key="item.skuId">
                <td>
                  <RouterLink :to="`/goods/${item.id}`" class="info">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </RouterLink>
                </td>
                <!-- 原则：不应该我们计算 -->
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkout.checkoutInfo.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkout.checkoutInfo.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkout.checkoutInfo.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">
                ¥{{ checkout.checkoutInfo.summary.totalPayPrice }}
              </dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary" @click="submitCheckout">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  background: #fff;
  padding: 0 20px;

  .box-title {
    font-size: 16px;
    font-weight: normal;
    padding-left: 10px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
  }

  .box-body {
    padding: 20px 0;
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

// 对话框地址列表
.xtx-dialog {
  .addressWrapper {
    max-height: 500px;
    overflow-y: auto;
  }

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;

      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }

      >ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
