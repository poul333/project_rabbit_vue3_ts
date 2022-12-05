<script setup lang="ts">
import { ApiRes, CateGoodsItem } from '@/types/data'
import request from '@/utils/request'
import GoodsItem from '@/views/category/components/goods-item.vue'
import { onMounted, PropType, ref } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
  type: {
    type: Number as PropType<1 | 2 | 3>,
    default: 1,
  },
})

// 标题对象
const titleObj = {
  1: '24小时热销榜',
  2: '周热销榜',
  3: '总热销榜',
}

// 发送请求获取数据
const route = useRoute()
const id = route.params.id as string
const list = ref<CateGoodsItem[]>([])
onMounted(async () => {
  const res = await request.get<ApiRes<CateGoodsItem[]>>('/goods/hot', {
    params: {
      id: id,
      type: props.type,
    },
  })
  list.value = res.data.result
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ titleObj[props.type] }}</h3>
    <div class="goods-list">
      <!-- 商品区块 -->
      <GoodsItem v-for="(item, index) in list" :key="index" :goods="item" />
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-hot {
  background-color: #fff;
  margin-bottom: 20px;
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  .goods-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
