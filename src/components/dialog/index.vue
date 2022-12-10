<script lang="ts" setup name="XtxDialog">
import { onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits<{
  (e: 'update:visible', visible: boolean): void
}>()

const close = () => {
  // console.log('关闭dialog')
  // this.$emit('update:visible', false)
  emit('update:visible', false)
}

// 给目标元素添加监听, 监听是否点击到了目标元素之外, 如果是, 就会执行回调
const target = ref(null)
onClickOutside(target, () => {
  close()
})

// css的显示, 做动画比较特殊, 需要两个状态
// 1. 默认显示的状态 - 渲染出来了后切换 (这个切换要比visible要晚一些)
// 2. 切换到的最终状态
const show = ref(false)

watch(
  () => props.visible,
  (value) => {
    // 你变了, 我也跟着变, 但是我稍微晚一点点 (保留两个状态 初始 => 最终)
    setTimeout(() => {
      show.value = value
    }, 20)
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div class="xtx-dialog" v-if="visible" :class="{ fade: show }">
    <!-- 白色的盒子 -->
    <div class="wrapper" ref="target" :class="{ fade: show }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          href="JavaScript:;"
          class="iconfont icon-close-new"
          @click="close"
        ></a>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  // background: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
