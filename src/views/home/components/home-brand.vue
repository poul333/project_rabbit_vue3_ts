<script lang="ts" setup name="HomeBrand">
import { ref } from 'vue';
import HomePanel from './home-panel.vue'
import useStore from '@/store';
import { useLazyData } from '@/utils/hooks'
const { home } = useStore()
const target = useLazyData(() => {
    home.getBrandList()
})
// 控制容器左右切换
const index = ref(0)
const prevClick = () => {
    if (index.value === 0) return
    index.value--
}
const nextClick = () => {
    if (index.value === Math.ceil(home.brandList.length / 5) - 1) return
    index.value++
}
</script>

<template>
    <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
        <template v-slot:right>
            <a :class="{ disabled: index === 0 }" href="javascript:;" class="iconfont icon-angle-left prev"
                @click="prevClick"></a>
            <a :class="{ disabled: index === Math.ceil(home.brandList.length / 5) - 1 }" href="javascript:;"
                class="iconfont icon-angle-right next" @click="nextClick"></a>
        </template>
        <div class="box" ref="box">
            <transition name="fade">
                <ul class="list" v-if="(home.brandList.length > 0)" :style="{
                    transform: `translateX(${-index * 1240}px)`,
                    width: Math.ceil(home.brandList.length / 5) * 100 + '%'
                }">
                    <li v-for="item in home.brandList" :key="item.id">
                        <RouterLink to="/">
                            <img :src="item.picture" alt="" />
                        </RouterLink>
                    </li>
                </ul>

                <div v-else class="skeleton">
                    <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" :width="240"
                        :height="305" />
                </div>
            </transition>
        </div>
    </HomePanel>
</template>

<style scoped lang="less">
.home-panel {
    background: #f5f5f5;
}

.iconfont {
    width: 20px;
    height: 20px;
    background: #ccc;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: @xtxColor;

    &::before {
        font-size: 12px;
        position: relative;
        top: -2px;
    }

    &.disabled {
        background: #ccc;
        cursor: not-allowed;
    }
}

.box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;

    .list {
        width: 200%;
        display: flex;
        transition: all 1s;

        li {
            margin-right: 10px;
            width: 240px;

            &:nth-child(5n) {
                margin-right: 0;
            }

            img {
                width: 240px;
                height: 305px;
            }
        }
    }
}

.skeleton {
    width: 100%;
    display: flex;

    .item {
        margin-right: 10px;

        &:nth-child(5n) {
            margin-right: 0;
        }
    }
}
</style>