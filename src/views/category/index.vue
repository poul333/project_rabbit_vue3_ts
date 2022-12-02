<script lang="ts" name="TopCategory" setup>
import { useRoute } from 'vue-router';
import useStore from '@/store';
import { watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia';
import GoodsItem from './components/goods-item.vue'
const route = useRoute()
const { category, home } = useStore()

// 监听了路由变化之后，从分类页跳转到首页，也会报错，因此需要判断路由地址
// #region
// watch(
//     () => route.params.id,
//     (newVal) => {
//         // if (route.fullPath === `/category/${newVal}`)
//         if (!newVal) return
//         category.getTopCategory(route.params.id as string)
//     },
//     {
//         immediate: true,
//     }
// )
// #endregion
// 响应式地追踪其依赖，并在依赖更改时重新执行
watchEffect(() => {
    // 判断有参数才发请求
    if (!route.params.id) return
    // 只在一级类目去发送该请求
    if (route.fullPath !== `/category/${route.params.id}`) return
    // 获取一级分类的数据（渲染面包屑等）
    category.getTopCategory(route.params.id as string)
    // 获取展示轮播图数据
    // category.getBannerList(route.params.id as string)
    home.getBannerList()
})

const { topCategory } = storeToRefs(category)

</script>

<template>
    <div class="top-category">
        <div class="container">
            <XtxBread>
                <XtxBreadItem to="/">首页</XtxBreadItem>
                <XtxBreadItem>{{ category.topCategory.name }}</XtxBreadItem>
            </XtxBread>

            <!-- 借用home轮播图数据 -->
            <XtxCarousel autoplay :slides="home.bannerList" style="height: 500px;"></XtxCarousel>

            <!-- 所有二级分类 -->
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="item in topCategory.children" :key="item.id">
                        <a href="javascript:;">
                            <img v-lazy="item.picture">
                            <p>{{ item.name }}</p>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- 分类关联商品 -->
            <div class="ref-goods" v-for="item in topCategory.children" :key="item.id">
                <div class="head">
                    <h3>-{{ item.name }}-</h3>
                    <p class="tag">温暖柔软，品质之选</p>
                    <XtxMore />
                </div>
                <div class="body">
                    <GoodsItem :goods="goods" v-for="goods in item.goods" :key="goods.id" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped lang="less">
.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;

                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: @xtxColor;
                    }
                }
            }
        }
    }
}

.ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
        .xtx-more {
            position: absolute;
            top: 20px;
            right: 20px;
        }

        .tag {
            text-align: center;
            color: #999;
            font-size: 20px;
            position: relative;
            top: -20px;
        }
    }

    .body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 65px 30px;
    }
}
</style>