<script setup lang="ts">
import { OrderPayInfo } from '@/types/order'
import { useCountDown } from '@/utils/hooks'
import dayjs from 'dayjs'
// 订单状态
const orderStatus = [
    { name: 'all', label: '全部订单' },
    { name: 'unpay', label: '待付款' },
    { name: 'deliver', label: '待发货' },
    { name: 'receive', label: '待收货' },
    { name: 'comment', label: '待评价' },
    { name: 'complete', label: '已完成' },
    { name: 'cancel', label: '已取消' },
]
const props = defineProps<{
    order: OrderPayInfo
}>()

const { time, start } = useCountDown(props.order.countdown)
start()

const formatTime = (time: number) => {
    if (time < 0) {
        return '已超时'
    }
    return dayjs.unix(time).format('mm分ss秒')
}
</script>

<template>
    <div class="order-item" v-if="order.id">
        <div class="head">
            <span>下单时间：{{ order.createTime }}</span>
            <span>订单编号：{{ order.id }}</span>
            <span class="down-time">
                <i class="iconfont icon-down-time"></i>
                <b>付款截止：{{ formatTime(time) }}</b>
            </span>
        </div>
        <div class="body">
            <div class="column goods">
                <ul>
                    <li v-for="item in order.skus" :key="item.id">
                        <a class="image" href="javascript:;">
                            <img :src="item.image" alt="" />
                        </a>
                        <div class="info">
                            <p class="name ellipsis-2">
                                {{ item.name }}
                            </p>
                            <p class="attr ellipsis">
                                <span>{{ item.attrsText }}</span>
                            </p>
                        </div>
                        <div class="price">¥{{ item.realPay }}</div>
                        <div class="count">x{{ item.quantity }}</div>
                    </li>
                </ul>
            </div>
            <div class="column state">
                <p>{{ orderStatus[order.orderState].label }}</p>
                <p v-if="order.orderState === 3">
                    <a href="javascript:;" class="green">查看物流</a>
                </p>
                <p v-if="order.orderState === 4">
                    <a href="javascript:;" class="green">评价商品</a>
                </p>
                <p v-if="order.orderState === 5">
                    <a href="javascript:;" class="green">查看评价</a>
                </p>
            </div>
            <div class="column amount">
                <p class="red">¥{{ order.payMoney }}</p>
                <p>（含运费：¥{{ order.postFee }}）</p>
                <p>在线支付</p>
            </div>
            <div class="column action">
                <XtxButton v-if="order.orderState === 1" type="primary" size="small">立即付款</XtxButton>
                <XtxButton v-if="order.orderState === 3" type="primary" size="small">确认收货</XtxButton>
                <p><a href="javascript:;">查看详情</a></p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                    <a href="javascript:;">再次购买</a>
                </p>
                <p v-if="[4, 5].includes(order.orderState)">
                    <a href="javascript:;">申请售后</a>
                </p>
                <p v-if="order.orderState === 1"><a href="javascript:;">取消订单</a></p>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.order-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;

    .head {
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        padding: 0 20px;
        overflow: hidden;

        span {
            margin-right: 20px;

            &.down-time {
                margin-right: 0;
                float: right;

                i {
                    vertical-align: middle;
                    margin-right: 3px;
                }

                b {
                    vertical-align: middle;
                    font-weight: normal;
                }
            }
        }

        .del {
            margin-right: 0;
            float: right;
            color: #999;
        }
    }

    .body {
        display: flex;
        align-items: stretch;

        .column {
            border-left: 1px solid #f5f5f5;
            text-align: center;
            padding: 20px;

            >p {
                padding-top: 10px;
            }

            &:first-child {
                border-left: none;
            }

            &.goods {
                flex: 1;
                padding: 0;
                align-self: center;

                ul {
                    li {
                        border-bottom: 1px solid #f5f5f5;
                        padding: 10px;
                        display: flex;

                        &:last-child {
                            border-bottom: none;
                        }

                        .image {
                            width: 70px;
                            height: 70px;
                            border: 1px solid #f5f5f5;
                        }

                        .info {
                            width: 220px;
                            text-align: left;
                            padding: 0 10px;

                            p {
                                margin-bottom: 5px;

                                &.name {
                                    height: 38px;
                                }

                                &.attr {
                                    color: #999;
                                    font-size: 12px;

                                    span {
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }

                        .price {
                            width: 100px;
                        }

                        .count {
                            width: 80px;
                        }
                    }
                }
            }

            &.state {
                width: 120px;

                .green {
                    color: @xtxColor;
                }
            }

            &.amount {
                width: 200px;

                .red {
                    color: @priceColor;
                }
            }

            &.action {
                width: 140px;

                a {
                    display: block;

                    &:hover {
                        color: @xtxColor;
                    }
                }
            }
        }
    }
}
</style>