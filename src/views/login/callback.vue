<script lang="ts" setup name="LoginCallback">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import useStore from '@/store'
import Message from '@/components/message';

const hasAccount = ref(true)
const { user } = useStore()
const router = useRouter()

// 登录后，需要拿到openId到后台进行判断，是否注册过
// 1. 判断用户是否登录
const isLogin = QC.Login.check()
// console.log(isLogin)
if (isLogin) {
    // 2. 获取openId
    QC.Login.getMe(async (openId) => {
        // 3. 发送请求进行QQ登录
        await user.qqLogin(openId)
        Message.success('登录成功')
        router.push('/')
    })
}

</script>

<template>
    <LoginHeader></LoginHeader>
    <section class="container">
        <nav class="tab">
            <a :class="{ active: hasAccount }" href="javascript:;" @click="hasAccount = true">
                <i class="iconfont icon-bind" />
                <span>已有小兔鲜账号，请绑定手机</span>
            </a>
            <a :class="{ active: !hasAccount }" href="javascript:;" @click="hasAccount = false">
                <i class="iconfont icon-edit" />
                <span>没有小兔鲜账号，请完善资料</span>
            </a>
        </nav>
        <div class="tab-content" v-if="hasAccount">
            <CallbackBind></CallbackBind>
        </div>
        <div class="tab-content" v-else>
            <CallbackPatch></CallbackPatch>
        </div>
    </section>
    <LoginFooter></LoginFooter>
</template>

<style scoped lang="less">
.container {
    padding: 25px 0;
}

.tab {
    background: #fff;
    height: 80px;
    padding-top: 40px;
    font-size: 18px;
    text-align: center;

    a {
        color: #666;
        display: inline-block;
        width: 350px;
        line-height: 40px;
        border-bottom: 2px solid #e4e4e4;

        i {
            font-size: 22px;
            vertical-align: middle;
        }

        span {
            vertical-align: middle;
            margin-left: 4px;
        }

        &.active {
            color: @xtxColor;
            border-color: @xtxColor;
        }
    }
}

.tab-content {
    min-height: 600px;
    background: #fff;
}
</style>
