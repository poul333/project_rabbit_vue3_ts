<script setup lang="ts" name="GoodsSku">
import { GoodsInfo, Spec, SpecValue } from '@/types/goods'
import bwPowerSet from '@/utils/bwPowerSet';
const props = defineProps<{
    goods: GoodsInfo,
    skuId?: string
}>()
const emit = defineEmits<{
    (e: 'changeSku', skuId: string): void
}>()

const SPLIT_STR = '+'    // 定义常量用来join拼接

// const arr = bwPowerSet(['蓝色', '176', '国产'])
// console.log(arr);

// 修改按钮的选中状态
const changeSelected = (spec: Spec, specValue: SpecValue) => {
    // 如果无库存，不能进行选中
    if (specValue.disabled) return
    if (specValue.selected) {
        // 如果有选中,取消选中
        specValue.selected = false
    } else {
        // 排他
        spec.values.forEach((v) => (v.selected = false))
        specValue.selected = true
    }
    // 如果按钮被重新选择，按钮状态也需要随之更新
    updateDisabledStatus()

    // (1). 判断，是否选中所有规格
    const selectedArr = getSelectedSpec().filter((item) => item)
    if (selectedArr.length === props.goods.specs.length) {
        // (2). 说明全部选中，此时将得到的数组转成字符串，去pathMap中寻找对应的skuId
        const key = selectedArr.join(SPLIT_STR)     // '蓝色+10cm+中国'
        const result = pathMap[key]
        const skuId = result[0]  // 因为所有规格都被选中，所以此时skuId，就是result的唯一值
        // 子传父
        emit('changeSku', skuId)
    } else {
        emit('changeSku', '')
    }
}

// 一进入页面，控制启用禁用状态，=> 需要路径字典
// 基于数据skus，得到路径字典
const getPathMap = () => {
    const pathMap: {
        [key: string]: string[]
    } = {}
    // 1.过滤skus,得到有效skus(库存 > 0)
    const skus = props.goods.skus.filter((item) => item.inventory > 0)

    // 2.遍历有效sku， 获取sku的子集
    skus.forEach((sku) => {
        // 3.整理数据
        const arr = sku.specs.map((item) => item.valueName)

        // 4. 基于整理后属性列表，求子集
        const powerSet = bwPowerSet(arr)

        // 5. 遍历子集，将子集的数据，往pathMap中整理
        //      (1). 如果筛选条件，不存在，新开一个属性，存
        //      (2). 如果筛选条件，已存在，在已有属性上，累加
        //          pathMap:{键：[skuId1 , skuId2]}
        powerSet.forEach((sub) => {
            // 将数组的信息，拼接为字符串，作为建，(sku.id作为值)
            const key = sub.join(SPLIT_STR)
            // 判断键在对象中是否存在
            if (key in pathMap) {
                // 已存在，在已有属性值上累加
                pathMap[key].push(sku.id)
            } else {
                // 如果不存在，新开一个属性，属性值，是一个有一项内容的数组
                pathMap[key] = [sku.id]
            }
        })
    })

    return pathMap
}

// 更新启用禁用状态
const updateDisabledStatus = () => {
    const selectArr = getSelectedSpec()

    //  根据路径字典 => 更新所有按钮(SpecValue)的状态
    props.goods.specs.forEach((spec, index) => {
        spec.values.forEach((specValue) => {
            // 让当前这个按钮，specValue.name(黑色) 和 selectArr 进行组合
            // 判断是否禁用时，需要拷贝一份原数组
            const tempArr = [...selectArr]
            tempArr[index] = specValue.name     // ['黑色','','']

            // 得到组合后，转成字符串key '黑色+10cm'
            const key = tempArr.filter((item) => item).join(SPLIT_STR)

            // 判断按钮是否在pathMap中存在
            if (key in pathMap) {
                // 存在，代表有库在，不禁用
                specValue.disabled = false
            } else {
                // 不存在，代表无库存，禁用
                specValue.disabled = true
            }
        })
    })
}

// 获取当前选中状态
const getSelectedSpec = () => {
    const arr = ['', '', '']
    props.goods.specs.forEach((spec, index) => {
        const tempObj = spec.values.find((specValue) => specValue.selected === true)
        arr[index] = tempObj ? tempObj.name : ''
    })
    return arr
}

// 默认根据父传子，传递的skuId，进行回显，设置选中状态
const initSelectedSpec = () => {
    if (!props.skuId) return
    const sku = props.goods.skus.find((item) => item.id === props.skuId)

    if (!sku) return
    // 基于sku.specs，让按钮设置为选中状态
    props.goods.specs.forEach((spec, index) => {
        // 查找出相匹配的，设置为选中
        const text = sku.specs[index].valueName
        const specValue = spec.values.find((item) => item.name === text)
        specValue!.selected = true
    })
}

// 1. 获取路径字典
const pathMap = getPathMap()

// 先按照skuId进行初始化，将选中状态设置好
initSelectedSpec()

// 3. 根据目前已选中的项 => 更新启用禁用状态
updateDisabledStatus()

</script>
<template>
    <div class="goods-sku">
        <dl v-for="(item, index) in goods.specs" :key="item.name">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="(sub) in item.values" :key="sub.name">
                    <img v-if="sub.picture" :class="{ selected: sub.selected, disabled: sub.disabled }"
                        :src="sub.picture" alt="" @click="changeSelected(item, sub)" />
                    <span :class="{ selected: sub.selected, disabled: sub.disabled }" @click="changeSelected(item, sub)"
                        v-else>{{ sub.name
                        }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
        border-color: @xtxColor;
    }

    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            >img {
                width: 50px;
                height: 50px;
                margin-top: 5px;
                .sku-state-mixin ();
            }

            >span {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                padding: 0 20px;
                margin-top: 5px;
                .sku-state-mixin ();
            }
        }
    }
}
</style>

