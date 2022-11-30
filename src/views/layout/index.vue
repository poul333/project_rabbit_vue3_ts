<script lang="ts" setup name="Layout">
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppFooter from './components/app-footer.vue'
import appHeaderSticky from './components/app-header-sticky.vue';
</script>
<template>
  <div>
    <AppTopnav></AppTopnav>
    <AppHeader></AppHeader>
    <!-- 吸顶导航 -->
    <appHeaderSticky></appHeaderSticky>
    <main class="app-body">
      <!-- 路由出口 -->
      <router-view></router-view>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>