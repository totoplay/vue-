import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/Login.vue'
import newslist from '../components/buy/Goods.vue'
import information from '../components/news/Information.vue'
import imges from '../components/news/Imges.vue'
import picture from '../components/picture/Picture.vue'
import photo from '../components/Photo.vue'
import detail from '../components/buy/Detail.vue'

import detail2 from '../components/picture/Detail.vue'
import parameters from '../components/picture/Parameters.vue'
import picturecom from '../components/picture/Picturecom.vue'

import member from '../components/Member.vue'
import search from '../components/Search.vue'
import addgoods from '../components/addgoods.vue'
import shoppingcart from '../components/ShoppingCart.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: login,
      children: [
        { path: '/photo', component: photo },
      ]
    },
    { path: '/newslist', component: newslist },
    { path: '/news/detail/:id', component: detail },
    { path: '/goods/detail/:id', component: detail2 },
    { path: '/goodsdesc/:id', component: parameters },
    { path: '/goodscomments/:id', component: picturecom },
    { path: '/goods/picture', component: picture },
    { path: '/photo/information', component: information },
    { path: '/photo/info/:id', component: imges },
    { path: '/member', component: member },
    { path: '/search', component: search },
    { path: '/addgoods', component: addgoods },
    { path: '/shoppingcart', component: shoppingcart },

  ]
})


// router.beforeEach((to, from, next) => {
// if (to.path === '/login') return next()
// })


export default router
