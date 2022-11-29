<script setup lang="ts">
import request from '@/utils/request'
async function getTest() {
  const res = await request.get('/home/index')
  console.log(res);
}
getTest()

</script>


<template>
  <div class="box">
    App
  </div>
  <h1>haha</h1>
</template>


<style lang="less" scoped>
.box {
  width: 300px;
  height: 300px;
  background-color: @xtxColor;
  .hoverShadow()
}
</style>