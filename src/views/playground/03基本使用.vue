<script setup lang="ts" name="">
import { ref } from 'vue';

const activeName = ref('second')
</script>


<template>
  <XtxTabs v-model="activeName">
    <XtxTabsPane label="用户管理" name="first">面板1</XtxTabsPane>
    <XtxTabsPane label="配置管理" name="second">面板2</XtxTabsPane>
    <XtxTabsPane label="角色管理" name="third">面板3</XtxTabsPane>
    <XtxTabsPane label="定时任务补偿" name="fourth">面板4</XtxTabsPane>
  </XtxTabs>

</template>


<style scoped>

</style>