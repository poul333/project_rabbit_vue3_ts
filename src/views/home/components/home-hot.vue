<script lang="ts" setup>
import useStore from '@/store'
import HomePanel from './home-panel.vue'
import { useLazyData } from '@/utils/hooks'
import HomeSkeleton from './home-skeleton.vue'
const { home } = useStore()
const target = useLazyData(() => {
    home.getHotList()
})
</script>
<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
        <transition name="fade">
            <ul ref="pannel" class="goods-list" v-if="(home.hotGoodList.length > 0)">
                <li v-for="item in home.hotGoodList" :key="item.id">
                    <RouterLink to="/">
                        <img v-lazy="item.picture" alt="" />
                        <p class="name">{{ item.title }}</p>
                        <p class="desc">{{ item.alt }}</p>
                    </RouterLink>
                </li>
            </ul>
            <!-- 骨架屏显示 -->
            <HomeSkeleton v-else></HomeSkeleton>
        </transition>
    </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;

    li {
        width: 306px;
        height: 406px;
        .hoverShadow();

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
        }

        .desc {
            color: #999;
            font-size: 18px;
        }
    }
}
</style>