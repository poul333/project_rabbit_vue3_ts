<template>
  <div class="xtx-switch">
    <span
      class="el-switch__core"
      :class="active ? 'active' : 'inactive'"
      @click="change"
    ></span>
  </div>
</template>

<script lang="ts" setup name="XtxSwitch">
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: [Boolean, Number, String],
    default: true,
  },
  activeValue: {
    type: [Boolean, Number, String],
    default: true,
  },
  inactiveValue: {
    type: [Boolean, Number, String],
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const active = ref(false)
watch(
  props,
  () => {
    if (props.modelValue === props.activeValue) {
      active.value = true
    }
    if (props.modelValue === props.inactiveValue) {
      active.value = false
    }
  },
  {
    immediate: true,
  }
)
const change = () => {
  if (active.value) {
    emit('update:modelValue', props.inactiveValue)
  } else {
    emit('update:modelValue', props.activeValue)
  }
}


</script>

<style lang="less" scoped>
.el-switch__core {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  vertical-align: middle;
}
.el-switch__core:after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  transition: all 0.3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}
.active::after {
  left: 100%;
  margin-left: -17px;
}
.active {
  width: 40px;
  border-color: rgb(19, 206, 102);
  background-color: rgb(19, 206, 102);
}
.inactive {
  width: 40px;
  border-color: rgb(255, 73, 73);
  background-color: rgb(255, 73, 73);
}
</style>
