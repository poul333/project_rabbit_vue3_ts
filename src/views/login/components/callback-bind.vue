<script name="CallbackBind" lang="ts" setup>
import { ref } from 'vue';
import { QQUserInfoRes, QQUserInfo } from '@/types/user'
import { useField, useForm } from 'vee-validate';
import { codeRule, mobileRule } from '@/utils/validate';
import useStore from '@/store';
import Message from '@/components/message';
import { useCountDown } from '@/utils/hooks'
import { useRouter } from 'vue-router';

// 获取qq头像和昵称
const qqInfo = ref<QQUserInfo>({} as QQUserInfo)
let openId = ''
// 获取qq授权信息
if (QC.Login.check()) {
    // 获取qq信息
    QC.api("get_user_info").success((res: QQUserInfoRes) => {
        qqInfo.value = res.data
    })
    // 获取openId
    QC.Login.getMe((id) => {
        openId = id
    })
}

const { validate, resetForm } = useForm({
    validationSchema: {
        mobile: mobileRule,
        code: codeRule
    }
})
const { value: mobile, errorMessage: mobileError } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')
const { user } = useStore()
const { time, start } = useCountDown()
const router = useRouter()

const send = async () => {
    // 如果还在倒计时中,不能被点击
    if (time.value > 0) return
    // 发送请求,获取验证码
    await user.sendQQBindMsg(mobile.value)
    Message.success('发送验证码成功')
    // 开启倒计时
    start()
}

const bind = async () => {
    // 先进行校验
    const res = await validate()
    if (!res.valid) return
    // 校验通过,发送请求进行绑定
    await user.qqBindLogin(openId, mobile.value, code.value)
    Message.success('绑定成功')
    router.push('/')
}

</script>
<template>
    <div class="xtx-form">
        <div class="user-info">
            <img :src="qqInfo.figureurl_qq" alt="" />
            <p>Hi，{{ qqInfo.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
        </div>
        <div class="xtx-form-item">
            <div class="field">
                <i class="icon iconfont icon-phone"></i>
                <input v-model="mobile" class="input" type="text" placeholder="绑定的手机号" />
            </div>
            <div v-if="mobileError" class="error">{{ mobileError }}</div>
        </div>
        <div class="xtx-form-item">
            <div class="field">
                <i class="icon iconfont icon-code"></i>
                <input v-model="code" class="input" type="text" placeholder="短信验证码" />
                <span @click="send" class="code">
                    {{ (time === 0 ? '发送验证码' : `${time}s后发送`) }} </span>
            </div>
            <div v-if="codeError" class="error">{{ codeError }}</div>
        </div>
        <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
    </div>
</template>

<style scoped lang="less">
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;

    img {
        background: #f2f2f2;
        width: 50px;
        height: 50px;
    }

    p {
        padding-left: 10px;
    }
}

.code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;

    &:hover {
        cursor: pointer;
    }
}
</style>
