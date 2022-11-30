<script lang="ts" setup name="XtxCarousel">
// script中如果不写东西，name不起作用！！！
import { BannerItem } from '@/types/data'
import { ref } from 'vue';

// 方式一
// import { PropType } from 'vue'
// defineProps({
//     sildes: {
//         type: Array as PropType<BannerItem[]>,
//          required:true
//     }
// })

// 方式二
const props = defineProps<{
    slides: BannerItem[]
}>()

// 控制小圆点高亮的下标
const active = ref(0)

// prev点击事件
const onPrev = () => {
    active.value--
    // 如果active.value小于下标最小值，归到下标最大值
    if (active.value < 0) active.value = props.slides.length - 1
}
// next点击事件
const onNext = () => {
    active.value++
    // 如果active.value溢出下标最大值，归0
    if (active.value >= props.slides.length) active.value = 0
}

// 小圆点点击事件
const onPpint = (Val:number) => {
    active.value = Val
}

</script>

<template>
    <div class="xtx-carousel">
        <!-- 轮播图主体 -->
        <ul class="carousel-body">
            <li v-for="(item, index) in slides" :key="item.id" class="carousel-item "
                :class="{ fade: index === active }">
                <RouterLink to="/">
                    <img :src="item.imgUrl" alt="" />
                </RouterLink>
            </li>
        </ul>
        <!-- 左箭头 -->
        <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left" @click="onPrev"></i></a>
        <!-- 右箭头 -->
        <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right" @click="onNext"></i></a>
        <!-- 小圆点 -->
        <div class="carousel-indicator">
            <span v-for="(item, index) in slides" :key="item.id" :class="{ active: index === active }"
                @click="onPpint(index)"></span>
        </div>
    </div>
</template>

<style scoped lang="less">
.xtx-carousel {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    position: relative;

    .carousel {
        &-body {
            width: 100%;
            height: 100%;
        }

        &-item {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: opacity 0.5s linear;

            &.fade {
                opacity: 1;
                z-index: 1;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        &-indicator {
            position: absolute;
            left: 0;
            bottom: 20px;
            z-index: 2;
            width: 100%;
            text-align: center;

            span {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                cursor: pointer;

                ~span {
                    margin-left: 12px;
                }

                &.active {
                    background: #fff;
                }
            }
        }

        &-btn {
            width: 44px;
            height: 44px;
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
            border-radius: 50%;
            position: absolute;
            top: 228px;
            z-index: 2;
            text-align: center;
            line-height: 44px;
            opacity: 0;
            transition: all 0.5s;

            &.prev {
                left: 20px;
            }

            &.next {
                right: 20px;
            }
        }
    }

    &:hover {
        .carousel-btn {
            opacity: 1;
        }
    }
}
</style>