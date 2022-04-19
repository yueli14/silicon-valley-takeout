import vueRouter from 'vue-router'
import Vue from 'vue'
// import Msite from "@/pages/Msite/Msite";
// import Order from "@/pages/Order/Order";
// import Profile from "@/pages/Profile/Profile";
// import Search from "@/pages/Search/Search";
//路由懒加载
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


import Login from "@/pages/Login/Login";
import Shop from "@/pages/Shop/Shop";
import ShopGoods from "@/pages/Shop/ShopGoods/ShopGoods";
import ShopRating from "@/pages/Shop/ShopRating/ShopRating";
import ShopInfo from "@/pages/Shop/ShopInfo/ShopInfo";

Vue.use(vueRouter)
export default new vueRouter({

  routes: [
    {
      path: '/msite',
      component: Msite,
      //  配置元数据，判断是否原始footer,默认为false
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/shop',

      component: Shop,
      children: [{
        path: '/shop/goods',
        component: ShopGoods

      }, {
        path: '/shop/rating',
        component: ShopRating

      }, {
        path: '/shop/info',
        component: ShopInfo

      },
        {
          path: '',
          redirect: '/shop/goods'
        },]
    }

  ]
})