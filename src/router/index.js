import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import store from '@/store'
Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    redirect: '/login',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: "首页",
          roles: ['administrator', 'input', 'approve'] // 管理员和销售人员可以访问
        },
        component: () => import('@/views/HomeView.vue'),
      },
    ]
  },
  {
    path: '/loan',
    redirect: '/loan-input/index',
    meta: {
      title: "贷款管理",
      roles: ['administrator', 'input'] // 管理员和销售人员可以访问
    },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        meta: {
          title: "贷款申请",
          roles: ['administrator', 'input'] // 管理员和销售人员可以访问
        },
        path: '/loan-input/index',
        name: 'loan-input',
        component: () => import('@/views/loan/indexView.vue'),
      },
    ]
  },
  {
    path: '/application-manage',
    redirect: '/application-manage/index',
    meta: {
      title: "申请管理",
      roles: ['administrator', 'input'] // 管理员和销售人员可以访问
    },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        meta: {
          title: "申请列表",
          roles: ['administrator', 'input'] // 管理员和销售人员可以访问
        },
        path: '/application-manage/index',
        name: 'application-manage/index',
        component: () => import('@/views/application-manage/indexView.vue'),
      },
    ]
  },
  {
    path: '/loan-approve',
    redirect: '/loan-approve/first',
    meta: {
      title: "贷款审批",
      roles: ['administrator', 'approve'] // 管理员和审核人员可以访问
    },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        meta: {
          title: "初审",
          roles: ['administrator', 'approve'] // 管理员和审核人员可以访问
        },
        path: '/loan-approve/first',
        name: 'loan-approve/first',
        component: () => import('@/views/loan-approve/firstView.vue'),
      },
      {
        meta: {
          title: "终审",
          roles: ['administrator'] // 管理员可以访问
        },
        path: '/loan-approve/end',
        name: 'end',
        component: () => import('@/views/loan-approve/endView.vue'),
      },
    ]
  },

  {
    path: '/contract-management',
    redirect: '/contract-list/index',
    meta: {
      title: "合同管理",
      roles: ['administrator'] // 管理员可以访问
    },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        meta: {
          title: "合同列表",
          roles: ['administrator'] // 管理员可以访问
        },
        path: '/contract-list/index',
        name: 'contract-list',
        component: () => import('@/views/contract-list/indexView.vue'),
      }
    ]
  },

  {
    path: '/permissions-management',
    redirect: '/permissions-management/create',
    meta: {
      title: "权限管理",
      roles: ['administrator'] // 管理员可以访问
    },
    component: () => import('@/layout/layout.vue'),
    children: [
      {
        meta: {
          title: "创建管理员",
          roles: ['administrator'] // 管理员可以访问
        },
        path: '/permissions-management/create',
        name: 'permissions-management/create',
        component: () => import('@/views/permissions-management/createView.vue'),
      },
      {
        meta: {
          title: "列表展示",
          roles: ['administrator'] // 管理员可以访问
        },
        path: '/permissions-management/list',
        name: 'permissions-management/list',
        component: () => import('@/views/permissions-management/listView.vue'),
      },
    ]
  },
]



const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const userRole = store.getters.userRole;  // 获取用户角色，例如从 Vuex 中获取
  const isAuthenticated = store.getters.isAuthenticated;//是否已登录

  if (to.matched.some(record => record.meta.roles)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      const requiredRole = to.meta.roles || to.matched.find(record => record.meta.roles).meta.roles;
      if (userRole === 'administrator' || requiredRole.includes(userRole)) {
        // 如果用户是管理员或者角色符合要求，继续导航
        next();
      } else {
        // 如果用户角色不符合要求，重定向到登录页面或其他错误处理
        store.dispatch('updateIsLogin', false);
        next('/login');
      }
    }
  } else {
    // 如果路由不需要特定角色权限，直接继续导航
    next();
  }
});

export default router
