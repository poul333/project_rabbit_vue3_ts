<script lang="ts" setup name="SubCategory">
import { useRoute } from 'vue-router';
const route = useRoute()

</script>
<template>
    <div class="category">二级分类组件 --- {{ route.params }}</div>
</template>

<style>

</style>
