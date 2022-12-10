<script setup lang="ts">
import HomeOverview from "./components/home-overview.vue";
import HomePanel from "./components/home-panel.vue";
</script>

<template>
    <div class="member-home">
        <HomeOverview />
        <HomePanel title="收藏的商品" />
        <HomePanel title="我的足迹" />
    </div>
</template>