<script lang="ts" setup name="XtxCity">
// 城市列表类型
export type AreaList = {
    code: string;
    level: number;
    name: string;
    areaList: AreaList[];
}

// 组件对外输出的信息格式
export type CityResult = {
    provinceCode: string;
    provinceName: string;
    cityCode: string;
    cityName: string;
    countyCode: string;
    countyName: string;
}

import { ref, watch } from 'vue';
import axios from 'axios';
import { onClickOutside } from '@vueuse/core'

defineProps<{
    userAddress?: string
}>()

const emit = defineEmits<{
    (e: 'changeCity', Val: CityResult): void
}>()

const active = ref(false)
const cityList = ref<AreaList[]>([])
const cacheList = ref<AreaList[]>([])   // 缓存一份数据
const target = ref(null)
// 选择城市
const changeResult = ref({
    // 省份相关
    provinceCode: '',
    provinceName: '',
    // 城市相关
    cityCode: '',
    cityName: '',
    // 区县相关
    countyCode: '',
    countyName: ''
})

// 切换弹框显示
const toggle = () => {
    active.value = !active.value
}
// 点击外面时关闭弹窗
onClickOutside(target, (e) => {
    active.value = false
})

const getCityList = async () => {
    const res = await axios.get<AreaList[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
    cityList.value = res.data
    cacheList.value = res.data
}

const selectCity = (item: AreaList) => {
    // 处理省份
    if (item.level === 0) {
        changeResult.value.provinceCode = item.code
        changeResult.value.provinceName = item.name
        cityList.value = item.areaList
    }
    // 处理城市
    if (item.level === 1) {
        changeResult.value.cityCode = item.code
        changeResult.value.cityName = item.name
        cityList.value = item.areaList
    }
    // 处理区县
    if (item.level === 2) {
        changeResult.value.countyCode = item.code
        changeResult.value.countyName = item.name
        active.value = false
        emit('changeCity', changeResult.value)
    }
}
getCityList()

// 监视弹框的关闭，关闭就重置数据
// 此处不需要进页面立即执行一次,故不使用watchEffct,(watchEffct一般可用来处理路由缓存问题)
watch(active, Val => {
    if (!Val) {
        cityList.value = cacheList.value
    }
})
</script>
<template>
    <div class="xtx-city" ref="target">
        <div class="select" @click="toggle" :class="{active:active}">
            <span class="value" v-if="userAddress">{{ userAddress }}</span>
            <span class="placeholder" v-else>请选择配送地址</span>
            <i class="iconfont icon-angle-down"></i>
        </div>
        <div class="option" v-show="active">
            <span @click="selectCity(item)" class="ellipsis" v-for="item in cityList" :key="item.code">{{ item.name
            }}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
        border: 1px solid #e4e4e4;
        height: 30px;
        padding: 0 5px;
        line-height: 28px;
        cursor: pointer;

        &.active {
            background: #fff;
        }

        .placeholder {
            color: #999;
        }

        .value {
            color: #666;
            font-size: 12px;
        }

        i {
            font-size: 12px;
            margin-left: 5px;
        }
    }

    .option {
        width: 542px;
        border: 1px solid #e4e4e4;
        position: absolute;
        left: 0;
        top: 29px;
        background: #fff;
        min-height: 30px;
        line-height: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;

        >span {
            width: 130px;
            text-align: center;
            cursor: pointer;
            border-radius: 4px;
            padding: 0 3px;

            &:hover {
                background: #f5f5f5;
            }
        }
    }
}
</style>