<script lang="ts" setup name="HomeProduct">
import useStore from '@/store';
import HomePanel from './home-panel.vue'
import { useLazyData } from '@/utils/hooks'
const { home } = useStore()
const target = useLazyData(() => {
    home.getProductList()
})
</script>

<template>
    <div class="home-product" ref="target">
        <HomePanel :title="item.name" sub-title="" v-for="item in home.productList" :key="item.id">
            <template v-slot:right>
                <div class="sub">
                    <RouterLink to="/" v-for="sub in item.children" :key="sub.id">
                        {{ sub.name }}
                    </RouterLink>
                </div>
                <XtxMore />
            </template>
            <div class="box">
                <RouterLink class="cover" to="/">
                    <img :style="{ objectFit: 'cover' }" v-lazy="item.picture" alt="" />
                    <strong class="label">
                        <span>{{ item.name }}</span>
                        <span>{{ item.saleInfo.slice(0, 4) }}</span>
                    </strong>
                </RouterLink>
                <ul class="goods-list">
                    <li v-for="goods in item.goods" :key="goods.id">
                        <div class="goods-item">
                            <RouterLink to="/" class="image">
                                <img v-lazy="goods.picture" alt="" />
                            </RouterLink>
                            <p class="name ellipsis-2">{{ goods.name }}</p>
                            <p class="desc ellipsis">{{ goods.desc }}</p>
                            <p class="price">&yen;{{ goods.price }}</p>
                            <div class="extra">
                                <RouterLink to="/">
                                    <span>找相似</span>
                                    <span>发现现多宝贝 &gt;</span>
                                </RouterLink>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </HomePanel>
    </div>
</template>

<style scoped lang="less">
.home-product {
    background: #fff;
    height: 2900px;

    .sub {
        margin-bottom: 2px;

        a {
            padding: 2px 12px;
            font-size: 16px;
            border-radius: 4px;

            &:hover {
                background: @xtxColor;
                color: #fff;
            }

            &:last-child {
                margin-right: 80px;
            }
        }
    }

    .box {
        display: flex;

        .cover {
            width: 240px;
            height: 610px;
            margin-right: 10px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }

            .label {
                width: 188px;
                height: 66px;
                display: flex;
                font-size: 18px;
                color: #fff;
                line-height: 66px;
                font-weight: normal;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0);

                span {
                    text-align: center;

                    &:first-child {
                        width: 76px;
                        background: rgba(0, 0, 0, 0.9);
                    }

                    &:last-child {
                        flex: 1;
                        background: rgba(0, 0, 0, 0.7);
                    }
                }
            }
        }

        .goods-list {
            width: 990px;
            display: flex;
            flex-wrap: wrap;

            li {
                width: 240px;
                height: 300px;
                margin-right: 10px;
                margin-bottom: 10px;

                &:nth-last-child(-n + 4) {
                    margin-bottom: 0;
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }
    }
}

.goods-item {
    width: 240px;
    height: 300px;
    padding: 10px 30px;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    transition: all 0.5s;

    .image {
        display: block;
        width: 160px;
        height: 160px;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
        }
    }

    p {
        margin-top: 6px;
        font-size: 16px;

        &.name {
            height: 44px;
        }

        &.desc {
            color: #666;
            height: 22px;
        }

        &.price {
            margin-top: 10px;
            font-size: 20px;
            color: @priceColor;
        }
    }

    .extra {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 86px;
        width: 100%;
        background: @xtxColor;
        text-align: center;
        transform: translate3d(0, 100%, 0);
        transition: all 0.5s;

        span {
            display: block;
            color: #fff;
            width: 120px;
            margin: 0 auto;
            line-height: 30px;

            &:first-child {
                font-size: 18px;
                border-bottom: 1px solid #fff;
                line-height: 40px;
                margin-top: 5px;
            }
        }
    }

    &:hover {
        border-color: @xtxColor;

        .extra {
            transform: none;
        }
    }
}
</style>
