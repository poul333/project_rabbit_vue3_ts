<script setup lang="ts">
import { ref } from 'vue'

// 订单状态
const orderStatus = [
  { name: 'all', label: '全部订单' },
  { name: 'unpay', label: '待付款' },
  { name: 'deliver', label: '待发货' },
  { name: 'receive', label: '待收货' },
  { name: 'comment', label: '待评价' },
  { name: 'complete', label: '已完成' },
  { name: 'cancel', label: '已取消' }
]
// 用于双向绑定高亮的名称
const activeName = ref(orderStatus[0].name)
</script>

<template>
  <div class="member-order">
    <XtxTabs v-model="activeName">
      <XtxTabsPane
        v-for="item in orderStatus"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      />
    </XtxTabs>
  </div>
</template>