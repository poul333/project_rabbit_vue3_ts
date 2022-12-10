<script setup lang="ts">
import MemberAside from './components/member-aside.vue'
</script>

<template>
    <div class="container">
        <!-- 左侧导航 -->
        <MemberAside />

        <!-- 右侧 -->
        <div class="article">
            <!-- 三级路由的出口 -->
            <RouterView />
        </div>
    </div>
</template>

<style scoped lang="less">
.container {
    display: flex;
    padding-top: 20px;

    .article {
        width: 1000px;
    }
}
</style>