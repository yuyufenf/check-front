import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from "@/store/storeAdmin.js";
import HomeView from '../views/main/home.vue'
import TimeUtil from "@/utils/time.js";
import storage from "@/utils/localStorage.js";

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      title: '后台管理系统',
      requiresAuth: true,
    },
    children: [
      {
        path: '/administrator/list',
        component: () => import('@/views/administrator/list.vue'),
      },
      {
        path: '/administrator/add',
        component: () => import('@/views/administrator/add.vue'),
      },{
        path: '/category/list',
        component: () => import('@/views/category/list.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path: '/login',
    name: 'login',
    component: () => import( '../views/main/login.vue'),
    meta:{
      title:'登陆'
    }
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

//全局前置守卫，修改title加校验等
router.beforeEach((to, from, next) => {
  //修改路由title
  if(to.meta.title){
    document.title = to.meta.title;
  }

  if(to.meta.requiresAuth){
    //此路由需要验证
    const store = useAdminStore();

    let time = TimeUtil.timeSub(Date.parse(new Date()) / 1000, store.data.expires)

    if(!store.data.token || time.expire){
      storage.remove("token");

      router.push('/login');
    }
  }

  next()
})

export default router
