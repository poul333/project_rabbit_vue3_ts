<script lang="ts" setup name="HomePanel">
// const { title = '标题', subTitle = '子标题' } = defineProps<{
//     title: string
//     subTitle: string
// }>()
defineProps({
    title: {
        type: String,
        default: '标题'
    },
    subTitle: {
        type: String,
        default: '子标题'
    }
})
</script>
<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <h3>{{ title }}<small>{{ subTitle }}</small></h3>
                <slot name="right"></slot>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="less">
.home-panel {
    background-color: #fff;

    .head {
        padding: 40px 0;
        display: flex;
        align-items: flex-end;

        h3 {
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>