<script lang="ts" name="TopCategory" setup>
import { useRoute } from 'vue-router';
const route = useRoute()

</script>

<template>
    <div class="category">一级分类组件 --- {{ route.params }}</div>
</template>
  
<style>

</style>