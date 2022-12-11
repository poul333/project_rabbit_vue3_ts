import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/views/layout/index.vue";
import Home from "@/views/home/index.vue";
import useStore from "@/store";

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        { path: "", component: Home },
        {
          path: "/category/:id",
          component: () => import("@/views/category/index.vue"),
        },
        {
          path: "/category/sub/:id",
          component: () => import("@/views/category/sub.vue"),
        },
        {
          path: "/goods/:id",
          component: () => import("@/views/goods/index.vue"),
        },
        {
          path: "/cart",
          component: () => import("@/views/cart/index.vue"),
        },
        {
          path: "/member/checkout",
          component: () => import("@/views/member/pay/checkout.vue"),
        },
        {
          path: "/member/pay",
          component: () => import("@/views/member/pay/index.vue"),
        },
        {
          path: "/pay/callback",
          component: () => import("@/views/member/pay/callback.vue"),
        },
        {
          path: "/member",
          component: () => import("@/views/member/layout/index.vue"),
          children: [
            {
              path: "",
              component: () => import("@/views/member/home/index.vue"),
            },
            {
              path: "order",
              component: () => import("@/views/member/order/index.vue"),
            },
          ],
        },
        {
          path: "/playground",
          component: () => import("@/views/playground/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/login/callback",
      component: () => import("@/views/login/callback.vue"),
    },
  ],
});

// 配置路由守卫
router.beforeEach((to, from, next) => {
  //  判断用户是否登录
  const { cart } = useStore();
  if (cart.isLogin) {
    // 已登录，放行
    next();
  } else {
    // 如果为游客身份，看要去哪
    if (to.path.includes("/member")) {
      // 如果要去结算页，先登录
      next({
        path: "/login",
        query: {
          redirectUrl: to.fullPath,
        },
      });
    } else {
      // 其他页面，放行
      next();
    }
  }
});

export default router;
