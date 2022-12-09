<script lang="ts" setup name="XtxNumbox">
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    },
    min: {
        type: Number,
        default: 1
    },
    max: {
        type: Number,
        default: 20
    },
    hasLabel: {
        type: Boolean,
        default: true
    }
})

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const add = () => {
    if (props.modelValue >= props.max) return
    emit('update:modelValue', props.modelValue + 1)
}
const sub = () => {
    if (props.modelValue <= props.min) return
    emit('update:modelValue', props.modelValue - 1)
}

const handleChange = (e: Event) => {
    const element = e.target as HTMLInputElement
    let value = +element.value
    if (isNaN(value)) value = 1
    if (value >= props.max) value = props.max
    if (value <= props.min) value = props.min
    emit('update:modelValue', value)
    proxy!.$forceUpdate()
}

</script>
<template>
    <div class="xtx-numbox">
        <div class="label" v-if="hasLabel">数量</div>
        <div class="numbox">
            <a href="javascript:;" @click="sub">-</a>
            <input type="text" :value="modelValue" @change="handleChange" />
            <a href="javascript:;" @click="add">+</a>
        </div>
    </div>
</template>

<style scoped lang="less">
.xtx-numbox {
    display: flex;
    align-items: center;

    .label {
        width: 60px;
        color: #999;
        padding-left: 10px;
    }

    .numbox {
        width: 120px;
        height: 30px;
        border: 1px solid #e4e4e4;
        display: flex;

        >a {
            width: 29px;
            line-height: 28px;
            text-align: center;
            background: #f8f8f8;
            font-size: 16px;
            color: #666;

            &:first-of-type {
                border-right: 1px solid #e4e4e4;
            }

            &:last-of-type {
                border-left: 1px solid #e4e4e4;
            }
        }

        >input {
            width: 60px;
            padding: 0 5px;
            text-align: center;
            color: #666;
        }
    }
}
</style>