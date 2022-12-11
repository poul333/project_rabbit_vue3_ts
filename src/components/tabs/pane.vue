<script setup lang="ts" name="XtxTabsPane">
import { inject } from 'vue';
defineProps<{
    label?: string
    name?: string
}>()

const activeNameValue = inject('activeNameValue')
</script>

<template>
    <div class="xtx-tabs-panel" v-show="activeNameValue === name">
        <slot></slot>
    </div>
</template>