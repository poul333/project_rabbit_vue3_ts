<script lang="ts" setup>
import { ref } from 'vue';
import HomePanel from './home-panel.vue'
import useStore from '@/store';
import HomeSkeleton from './home-skeleton.vue';
import DefaultImg from '@/assets/images/200.png'
import { useLazyData } from '@/utils/hooks'
const { home } = useStore()
// #region
// import { useIntersectionObserver } from '@vueuse/core';
// const target = ref(null)
// // 组件数据懒加载
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//     // 是否进入可视区
//     if (isIntersecting) {
//         home.getNewList()   // 发送请求获取数据
//         stop()  // 停止监听
//     }
// })
// #endregion

// 使用封装的组件数据懒加载
const target = useLazyData(() => {
    home.getNewList()
})    
</script>
<template>
    <div class="home-new" ref="target">
        <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
            <template #right>
                <XtxMore path="/" />
            </template>
            <!-- 面板内容 -->
            <transition name="fade">
                <ul v-if="(home.newGoodList.length > 0)" class="goods-list">
                    <li v-for="item in home.newGoodList" :key="item.id">
                        <RouterLink :to="`/goods/${item.id}`">
                            <img v-lazy="(item.picture || DefaultImg)" alt="" />
                            <p class="name ellipsis">{{ item.name }}</p>
                            <p class="price">&yen;{{ item.price }}</p>
                        </RouterLink>
                    </li>
                </ul>
                <!-- 骨架屏 -->
                <HomeSkeleton v-else></HomeSkeleton>
            </transition>
        </HomePanel>
    </div>
</template>
 animated fade
<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }

        .price {
            color: @priceColor;
        }
    }
}
</style>