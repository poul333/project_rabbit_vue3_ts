<script setup lang="ts">
import { ApiRes } from '@/types/data'
import request from '@/utils/request'
import { ref, watch, VNode } from 'vue'
import OrderItem from './components/order-item.vue'
import { OrderListInfo } from '@/types/order'
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

const activeName = ref('all')

const orderState = ref(0)

const change = (obj: { tab: VNode; index: number }) => {
    orderState.value = obj.index
}

const orderList = ref<OrderListInfo>({} as OrderListInfo)
watch(
    orderState,
    async (value) => {
        const res = await request.get<ApiRes<OrderListInfo>>('/member/order', {
            params: {
                orderState: value,
            },
        })
        orderList.value = res.data.result
        // console.log(res)
    },
    {
        immediate: true,
    }
)
</script>

<template>
    <div class="member-order">
        <XtxTabs v-model="activeName" @tab-click="change">
            <XtxTabsPane v-for="item in orderStatus" :key="item.name" :name="item.name" :label="item.label">
                <div class="order-list">
                    <OrderItem v-for="item in orderList.items" :key="item.id" :order="item" />
                </div>
            </XtxTabsPane>
        </XtxTabs>
    </div>
</template>

<style scoped lang="less">
.order-list {
    background-color: #fff;
    padding: 20px;
}
</style>