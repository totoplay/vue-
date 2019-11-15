<template>
  <div id="app">
    <div class="app_header">
      <div @click="goback" v-show="flag">
        <i>
          <van-icon name="arrow-left" />
        </i>
        <span >返回</span>
      </div>黑马程序员.vant
    </div>
    <!-- 路由占位符 -->
      <router-view />

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" @click="$router.push('/login')">首页</van-tabbar-item>
      <van-tabbar-item icon="manager"  @click="$router.push('/member')">会员</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart"  @click="$router.push('/shoppingcart')" :info="$store.getters.getcount">购物车</van-tabbar-item>

      <van-tabbar-item icon="search" @click="$router.push('/search')">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: "app",
  data() {
    return {
      flag:false,
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      }
    };
  },
  created() {
    this.flag=this.$route.path==='/login'?false:true
  },
  methods: {
    goback(){
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.path':function(newval){
      if(newval==='/login'){
        this.flag=false
      }else{
        this.flag=true
      }
    }
  },
};
</script>

<style lang="less">
.app_header {
  width: 100%;
  height: 40px;
  background: #1989fa;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  div {
    float: left;
  }
}
</style>
