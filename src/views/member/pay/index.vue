<script name="XtxPayPage" setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs'
import request, { baseURL } from '@/utils/request'
import { ApiRes } from '@/types/data'
import { OrderPayInfo } from '@/types/order'
import { useCountDown } from '@/utils/hooks';
import Message from '@/components/message';

const router = useRouter()
const route = useRoute()
const id = route.query.id

// 存储倒计时时间
const showTime = ref(0)

// 订单数据
const order = ref<OrderPayInfo>({} as OrderPayInfo)
// 发送请求
async function getOrderInfo() {
    const res = await request.get<ApiRes<OrderPayInfo>>(`/member/order/${id}`)
    order.value = res.data.result

    const { time, start } = useCountDown(order.value.countdown)
    start()

    // 将初始值同步给 showTime ,解决刷新 00分00秒问题
    showTime.value = order.value.countdown

    watch(time, (value) => {
        showTime.value = value

        // 如果订单倒计时结束，返回购物车
        if (value <= 0) {
            router.replace('/cart')
            Message.warning('订单已超时，请重新下单')
        }
    })
}
getOrderInfo()

// v3使用函数代替过滤器
const formatTime = (time: number) => {
    return dayjs.unix(time).format('mm分ss秒')
}

// 回跳地址
const redirectUrl = encodeURIComponent('http://www.corho.com:8080/#/pay/callback')
// 支付地址
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`

</script>
<template>
    <div class="xtx-pay-page">
        <div class="container">
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem to="/cart">购物车</XtxBreadItem>
                <XtxBreadItem>支付订单</XtxBreadItem>
            </XtxBread>
            <!-- 付款信息 -->
            <div class="pay-info" v-if="order.totalMoney">
                <span class="icon iconfont icon-queren2"></span>
                <div class="tip">
                    <p>订单提交成功！请尽快完成支付。</p>
                    <p>支付还剩 <span>{{ formatTime(showTime) }}</span>, 超时后将取消订单</p>
                </div>
                <div class="amount">
                    <span>应付总额：</span>
                    <span>¥{{ order.totalMoney }}</span>
                </div>
            </div>
            <!-- 付款方式 -->
            <div class="pay-type">
                <p class="head">选择以下支付方式付款</p>
                <div class="item">
                    <p>支付平台</p>
                    <a class="btn wx" href="javascript:;"></a>
                    <a class="btn alipay" :href="payUrl"></a>
                </div>
                <div class="item">
                    <p>支付方式</p>
                    <a class="btn" href="javascript:;">招商银行</a>
                    <a class="btn" href="javascript:;">工商银行</a>
                    <a class="btn" href="javascript:;">建设银行</a>
                    <a class="btn" href="javascript:;">农业银行</a>
                    <a class="btn" href="javascript:;">交通银行</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.pay-info {
    background: #fff;
    display: flex;
    align-items: center;
    height: 240px;
    padding: 0 80px;

    .icon {
        font-size: 80px;
        color: #1dc779;
    }

    .tip {
        padding-left: 10px;
        flex: 1;

        p {
            &:first-child {
                font-size: 20px;
                margin-bottom: 5px;
            }

            &:last-child {
                color: #999;
                font-size: 16px;
            }
        }
    }

    .amount {
        span {
            &:first-child {
                font-size: 16px;
                color: #999;
            }

            &:last-child {
                color: @priceColor;
                font-size: 20px;
            }
        }
    }
}

.pay-type {
    margin-top: 20px;
    background-color: #fff;
    padding-bottom: 70px;

    p {
        line-height: 70px;
        height: 70px;
        padding-left: 30px;
        font-size: 16px;

        &.head {
            border-bottom: 1px solid #f5f5f5;
        }
    }

    .btn {
        width: 150px;
        height: 50px;
        border: 1px solid #e4e4e4;
        text-align: center;
        line-height: 48px;
        margin-left: 30px;
        color: #666666;
        display: inline-block;

        &.active,
        &:hover {
            border-color: @xtxColor;
        }

        &.alipay {
            background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
        }

        &.wx {
            background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
        }
    }
}
</style>