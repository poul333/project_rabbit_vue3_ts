<script lang="ts" setup name="LoginForm">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate' // 引入验证规则
import { useIntervalFn } from '@vueuse/core'
import { useCountDown } from '@/utils/hooks'
import Message from '@/components/message';
import useStore from '@/store';
const router = useRouter()
const { user } = useStore()
const type = ref<'account' | 'mobile'>('account')       // 控制切换 
// const form = ref({
//     account: '',
//     password: '',
//     isAgree: false
// })

const changeFn = () => {
    // console.log('值改了')
}

// 添加校验
const { validate, resetForm } = useForm({

    // 设置初始值
    initialValues: {
        mobile: '13012345678',
        code: '123456',
        account: 'cdshi0001',
        password: '123456',
        isAgree: true
    },

    // 设置校验规则 
    validationSchema: {
        account(value: string) {
            if (!value) return '请输入用户名'
            // 6-20个字符
            if (!/^[A-z]\w{5,19}$/.test(value)) return '必须是字母开头的6-20个字符'
            return true
        },
        password(value: string) {
            if (!value) return '请输入密码'
            if (!/^\w{6,15}$/.test(value)) return '请输入6-15字符密码'
            return true
        },
        isAgree: (value: boolean) => {
            if (!value) return '请同意隐私条款'
            return true
        },
        mobile(value: string) {
            if (!value) return '请输入手机号'
            if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式有误'
            return true
        },
        code(value: string) {
            if (!value) return '请输入验证码'
            if (!/^\d{6}$/.test(value)) return '验证码格式有误'
            return true
        }
    }
})

// value: 用来的表单绑定的响应式数据
// errorMessage： 错误信息提示，用于实时展示
const { value: account, errorMessage: accountError } = useField<string>('account')
const { value: password, errorMessage: passwordError } = useField<string>('password')
const { value: mobile, errorMessage: mobileError, validate: validateMobile } = useField<string>('mobile')
const { value: code, errorMessage: codeError } = useField<string>('code')
const { value: isAgree, errorMessage: isAgreeError } = useField<boolean>('isAgree')

// 登录逻辑
const login = async () => {
    // 登录前的校验
    const res = await validate()

    if (type.value === 'account') {
        // 账号登录   如果账号 | 密码 | 同意许可 未通过，return
        if (res.errors.account || res.errors.password || res.errors.isAgree) return
        await user.login(account.value, password.value)
    } else {
        // 短信验证码登录   如果手机号 | 验证码 | 同意许可 未通过，return
        if (res.errors.mobile || res.errors.code || res.errors.isAgree) return
        await user.mobileLogin(mobile.value, code.value)
    }

    Message.success('登录成功')
    router.push('/')
}

// 表单验证切换重置
watch(type, () => {
    resetForm()
})


// 发送验证码
//      倒计时
const { time, resume, start } = useCountDown()

const mobileRef = ref<HTMLInputElement | null>(null)

// let timeId = -1     //定时器id
const send = async () => {
    //  如果是在倒计时的过程中，send点击事件不应该被触发
    if (time.value > 0) return

    const res = await validateMobile()
    if (!res.valid) {
        mobileRef.value?.focus()
        return
    }
    await user.sendMobileCode(mobile.value)
    Message.success('获取验证码成功')

    // 实现验证码倒计时
    start()
}

</script>
<template>
    <div class="account-box">
        <div class="toggle">
            <a @click="type = 'account'" href="javascript:;" v-if="type === 'mobile'">
                <i class="iconfont icon-user"></i> 使用账号登录
            </a>
            <a @click="type = 'mobile'" href="javascript:;" v-else>
                <i class="iconfont icon-msg"></i> 使用短信登录
            </a>
        </div>
        <div class="form">
            <template v-if="type === 'account'">
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input v-model="account" type="text" placeholder="请输入用户名" />
                    </div>
                    <div class="error" v-if="accountError"><i class="iconfont icon-warning" />{{ accountError }}</div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-lock"></i>
                        <input v-model="password" type="password" placeholder="请输入密码" />
                    </div>
                    <div class="error" v-if="passwordError"><i class="iconfont icon-warning" />{{ passwordError }}</div>
                </div>
            </template>
            <template v-else>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-user"></i>
                        <input ref="mobileRef" v-model="mobile" type="text" placeholder="请输入手机号" />
                    </div>
                    <div class="error" v-if="mobileError"><i class="iconfont icon-warning" />{{ mobileError }}</div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-code"></i>
                        <input v-model="code" type="text" placeholder="请输入验证码" />
                        <span class="code" @click="send">
                            {{ time === 0 ? '发送验证码' : `${time}s后发送` }}
                        </span>
                    </div>
                    <div class="error" v-if="codeError"><i class="iconfont icon-warning" />{{ codeError }}</div>
                </div>
            </template>
            <div class="form-item">
                <div class="agree">
                    <XtxCheckbox v-model="isAgree" @change="changeFn">我已同意</XtxCheckbox>
                    <a href="javascript:;">《隐私条款》</a>
                    <span>和</span>
                    <a href="javascript:;">《服务条款》</a>
                </div>
                <div class="error" v-if="isAgreeError"><i class="iconfont icon-warning" />{{ isAgreeError }}</div>
            </div>
            <a href="javascript:;" class="btn" @click="login">登录</a>
        </div>
        <div class="action">
            <a
                href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"><img
                    src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="QQ登录"
                    border="0" /></a>
            <div class="url">
                <a href="javascript:;">忘记密码</a>
                <a href="javascript:;">免费注册</a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
    .toggle {
        padding: 15px 40px;
        text-align: right;

        a {
            color: @xtxColor;

            i {
                font-size: 14px;
            }
        }
    }

    .form {
        padding: 0 40px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: @priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: @xtxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: @priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: @xtxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            cursor: pointer;
        }

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}
</style>
