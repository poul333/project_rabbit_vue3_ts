<script lang="ts" setup name="CheckoutAddress">
import useStore from '@/store'
import { UserAddress } from '@/types/checkout'
import { ref, watch } from 'vue'
import { CityResult } from '@/components/city/index.vue'
import Message from '@/components/message'
// import XtxSwitch from '@/components/switch/index.vue'
// import XtxDialog from '@/components/dialog/index.vue'

const { checkout } = useStore()

const dialogVisible = ref(false)

const formData = ref<UserAddress>({
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 1,
  fullLocation: '',
} as UserAddress)

const changeCity = (city: CityResult) => {
  formData.value.provinceCode = city.provinceCode
  formData.value.cityCode = city.cityCode
  formData.value.countyCode = city.countyCode
  formData.value.fullLocation =
    city.provinceName + ' ' + city.cityName + ' ' + city.countyName
}

const confirm = async () => {
  if (formData.value.id) {
    await checkout.updateAddress(formData.value)
  } else {
    await checkout.addAddress(formData.value)
  }
  // 提示消息
  Message.success('操作成功')
  // 关闭弹窗
  dialogVisible.value = false
}

watch(dialogVisible, (value) => {
  if (!value) {
    // 关闭的时候
    formData.value = {
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1,
      fullLocation: '',
    } as UserAddress
  }
})

const editAddress = () => {
  dialogVisible.value = true
  if (checkout.showAddress) {
    // 防止修改的时候，直接影响到当前显示的地址
    formData.value = {
      ...checkout.showAddress,
    }
  }
}

// 切换地址的显示和隐藏
const visible = ref(false)

// 记录选中的地址
const selectAddress = ref<UserAddress>()

watch(visible, (value) => {
  if (value) {
    selectAddress.value = checkout.showAddress!
  }
})

const changeAddress = async () => {
  // 把当前选中的地址变成默认地址
  if (selectAddress.value) {
    await checkout.updateAddress({
      ...selectAddress.value,
      isDefault: 0,
    })
    Message.success('修改地址成功')
    visible.value = false
  }
}
</script>
<template>
  <div class="checkout-address">
    <div class="text">
      <div class="none" v-if="!checkout.showAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <template v-else>
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ checkout.showAddress.receiver }}
          </li>
          <li><span>联系方式：</span>{{ checkout.showAddress.contact }}</li>
          <li>
            <span>收货地址：</span>{{
                checkout.showAddress.fullLocation +
                ' ' +
                checkout.showAddress.address
            }}
          </li>
        </ul>
        <a href="javascript:;" @click="editAddress">修改地址</a>
      </template>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="visible = true">切换地址</XtxButton>
      <XtxButton class="btn" @click="dialogVisible = true">添加地址</XtxButton>
    </div>

    <XtxDialog title="添加收货地址" v-model:visible="dialogVisible">
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input class="input" v-model="formData.receiver" placeholder="请输入收货人" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input class="input" v-model="formData.contact" placeholder="请输入手机号" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity :user-address="formData.fullLocation" @change-city="changeCity" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input class="input" v-model="formData.address" placeholder="请输入详细地址" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input class="input" v-model="formData.postalCode" placeholder="请输入邮政编码" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input class="input" v-model="formData.addressTags" placeholder="请输入地址标签，逗号分隔" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">默认地址：</div>
            <div class="field">
              <XtxSwitch v-model="formData.isDefault" :active-value="0" :inactive-value="1"></XtxSwitch>
            </div>
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <XtxButton type="gray" style="margin-right: 20px" @click="dialogVisible = false">取消</XtxButton>
        <XtxButton type="primary" @click="confirm">确认</XtxButton>
      </template>
    </XtxDialog>

    <XtxDialog title="切换收货地址" v-model:visible="visible">
      <template #default>
        <div class="text item" v-for="item in checkout.checkoutInfo.userAddresses" :key="item.id"
          @click="selectAddress = item" :class="{ active: selectAddress === item }">
          <ul>
            <li>
              <span>收<i />货<i />人：</span>{{ item.receiver }}
            </li>
            <li><span>联系方式：</span>{{ item.contact }}</li>
            <li>
              <span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}
            </li>
          </ul>
        </div>
      </template>
      <template #footer>
        <XtxButton type="gray" style="margin-right: 20px" @click="visible = false">
          取消
        </XtxButton>
        <XtxButton type="primary" @click="changeAddress">确认</XtxButton>
      </template>
    </XtxDialog>
  </div>
</template>

<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;

      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }

      >ul {
        padding: 10px;
        font-size: 14px;
      }
    }

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    height: 625px;
    overflow-y: auto;

    .body {
      font-size: 14px;
    }

    .xtx-form-item {
      padding-bottom: 10px;
    }
  }
}

.xtx-form {
  padding: 0;

  input {
    outline: none;

    &::placeholder {
      color: #ccc;
    }
  }
}

.xtx-city {
  width: 320px;

  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;

    .placeholder {
      color: #ccc;
    }

    i {
      color: #ccc;
      font-size: 18px;
    }

    .value {
      font-size: 14px;
    }
  }

  :deep(.option) {
    top: 49px;
  }
}

.xtx-form-item .field {
  line-height: 50px;
}
</style>
