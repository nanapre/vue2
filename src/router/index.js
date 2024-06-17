import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import store from '@/store'
Vue.use(VueRouter)

if (localStorage.getItem('token')) {
  store.dispatch('getMenuList')
}

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
        component: () => import('@/views/HomeView.vue'),
      },
    ]
  },
  // {
  //   path: '/loan',
  //   redirect: '/loan-input/index',
  //   component: () => import('@/layout/layout.vue'),
  //   children: [
  //     {
  //       meta: {
  //         title: "贷款申请"
  //       },
  //       path: '/loan-input/index',
  //       name: 'loan-input',
  //       component: () => import('@/views/loan/indexView.vue'),
  //     },
  //   ]
  // },
  // {
  //   path: '/application-manage',
  //   redirect: '/application-manage/index',
  //   meta: {
  //     title: "申请管理"
  //   },
  //   component: () => import('@/layout/layout.vue'),
  //   children: [
  //     {
  //       meta: {
  //         title: "申请列表"
  //       },
  //       path: '/application-manage/index',
  //       name: 'application-manage/index',
  //       component: () => import('@/views/application-manage/indexView.vue'),
  //     },
  //   ]
  // },
  // {
  //   path: '/loan-approve',
  //   redirect: '/loan-approve/first',
  //   meta: {
  //     title: "贷款审批"
  //   },
  //   component: () => import('@/layout/layout.vue'),
  //   children: [
  //     {
  //       meta: {
  //         title: "初审"
  //       },
  //       path: '/loan-approve/first',
  //       name: 'loan-approve/first',
  //       component: () => import('@/views/loan-approve/firstView.vue'),
  //     },
  //     {
  //       meta: {
  //         title: "终审"
  //       },
  //       path: '/loan-approve/end',
  //       name: 'end',
  //       component: () => import('@/views/loan-approve/endView.vue'),
  //     },
  //   ]
  // },

  // {
  //   path: '/contract-management',
  //   redirect: '/contract-list/index',
  //   meta: {
  //     title: "合同管理"
  //   },
  //   component: () => import('@/layout/layout.vue'),
  //   children: [
  //     {
  //       meta: {
  //         title: "合同列表"
  //       },
  //       path: '/contract-list/index',
  //       name: 'contract-list',
  //       component: () => import('@/views/contract-list/indexView.vue'),
  //     }
  //   ]
  // },

  // {
  //   path: '/permissions-management',
  //   redirect: '/permissions-management/create',
  //   meta: {
  //     title: "权限管理"
  //   },
  //   component: () => import('@/layout/layout.vue'),
  //   children: [
  //     {
  //       meta: {
  //         title: "创建管理员"
  //       },
  //       path: '/permissions-management/create',
  //       name: 'permissions-management/create',
  //       component: () => import('@/views/permissions-management/createView.vue'),
  //     },
  //     {
  //       meta: {
  //         title: "列表展示"
  //       },
  //       path: '/permissions-management/list',
  //       name: 'permissions-management/list',
  //       component: () => import('@/views/permissions-management/listView.vue'),
  //     },
  //   ]
  // },
]



const router = new VueRouter({
  routes
})

export default router
