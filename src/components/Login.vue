<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="1000" class="swipe">
      <van-swipe-item v-for="item in imgList" :key="item.id">
        <img :src="item.img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 宫格 -->
    <van-grid :column-num="3" class="grid">
      <van-grid-item to="/newslist">
        <img src="../assets/menu1.png" />
        <p>新闻资讯</p>
      </van-grid-item>
      <van-grid-item to="/photo/information">
        <img src="../assets/menu2.png" />
        <p>图片分享</p>
      </van-grid-item>
      <van-grid-item to="/goods/picture">
        <img src="../assets/menu3.png" />
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/menu4.png" />
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/menu5.png" />
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/menu6.png" />
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: []
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    //获取图片
    // 1.0   获取轮播图的API地址    请求方式 Get      请求地址  /api/getlunbo
    async getImg() {
      const { data: res } = await this.$http.get("getlunbo");
      console.log(res);
      this.imgList = res.message;
    }
  }
};
</script>

<style lang="less" scoped>
.swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.grid {
  img {
    width: 60px;
  }
  p {
    font-size: 14px;
    color: #000;
  }
}
</style>