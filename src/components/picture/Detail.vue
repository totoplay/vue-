<template>
  <div class="goodsinfo-container">
    <div class="swiper-container">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="item in images" :key="item.id">
          <img :src="item.src" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 商品信息区域 -->
    <div class="card">
      <div class="card-header">{{ goodsinfo.title }}</div>
      <div class="card-body">
        <div class="goods_info">
          <span>
            市场价：
            <span class="old-price">￥{{ goodsinfo.market_price }}</span>
          </span>
          &nbsp;
          <span>
            销售价：
            <span class="now-price">￥{{ goodsinfo.sell_price }}</span>
          </span>
        </div>
        <div class="goods_info count-box">
          <span>购买数量：</span>
          <van-stepper v-model="count" min="1" :max="goodsinfo.stock_quantity" integer />
        </div>
        <div class="goods_info">
          <van-button size="small" type="primary">立即购买</van-button>
          <van-button size="small" type="danger" @click="saveGoods">加入购物车</van-button>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="card">
      <div class="card-header">商品参数</div>
      <div class="card-body">
        <p class="info-txt">商品货号：{{ goodsinfo.goods_no }}</p>
        <p class="info-txt">库存情况：{{ goodsinfo.stock_quantity }}</p>
        <p class="info-txt">上架时间：{{ goodsinfo.add_time | dateFormat}}</p>
      </div>
    </div>

    <!-- 图文介绍 -->
    <div class="card">
      <van-button plain hairline type="info" class="btn1" size="large" @click="goparameters(path)"> 图文介绍</van-button>
      <br />
      <van-button plain hairline type="danger" class="btn1" size="large" @click="gopicturecom(path)">商品评论</van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 商品数据
      goodsinfo: [],
      //   轮播图
      images: [],
      path: this.$route.params.id,
      //   详情
      goodsdesc: [],
      count: 1
    };
  },
  created() {
    this.getImg();
    // this.getgoodsdesc()
    // this.getnews()
    this.getGoodsinfo();
  },
  methods: {
    // 添加到购物车
    saveGoods() {
      const addgoods = {
        id: this.goodsinfo.id,
        count: this.count,
        price: this.goodsinfo.sell_price
      };
      this.$store.commit("addtocar", addgoods);
    },
    getCount() {},
    //获取轮播图
    async getImg(id) {
      const { data: res } = await this.$http.get(`getthumimages/${this.path}`);
      console.log(res);
      this.images = res.message;
    },
    //   /api/getgoods?pageindex=number
    //获取商品数据
    // async getnews(id) {
    //   const { data: res } = await this.$http.get(
    //     `getgoods?pageindex=${this.pageindex}`
    //   );
    //   console.log(res);
    //   this.news = res.message[0];
    //   console.log(this.news);
    // },
    //获取图文
    // /api/goods/getdesc/:id
    //  async getgoodsdesc(id){
    //      const {data:res}=await this.$http.get(
    //          `goods/getdesc/${this.$route.params.id}`
    //      )
    //      this.goodsdesc=res.message
    //   },
    // 获取参数
    // /api/goods/getinfo/:id
    async getGoodsinfo(id) {
      const { data: res } = await this.$http.get(`goods/getinfo/${this.path}`);
      this.goodsinfo = res.message[0];
      console.log(this.goodsinfo);
    },
    // 图文详细
    goparameters(id){
       this.$router.push({
        path: `/goodsdesc/${id}`
      });
    },
    // 评论
    gopicturecom(id){
       this.$router.push({
        path: `/goodscomments/${id}`
      });
    }

  }
};
</script>

<style lang="less" scoped>
.card {
  box-shadow: 0 1px 1px #aaa;
  border-radius: 2px;
  margin: 8px;
  background-color: #fff;
  padding: 3px;
}
.card-header {
  border-bottom: 1px solid #eee;
  padding: 12px 10px;
  font-size: 16px;
}
.card-body {
  padding: 12px 10px;
}
.info-txt {
  font-size: 12px;
  line-height: 30px;
  color: gray;
}

.swiper-container {
  height: 230px;
  border: 1px solid #ccc;
  border-radius: 3px;
  img {
    margin: 0 86px;
    width: 200px;
    height: 230px;
  }
}
.goodsinfo-container {
  overflow: hidden;
}
.goods_info {
  padding: 10px 0;
  color: gray;
  font-size: 12px;
}
.old-price {
  color: gray;
  text-decoration: line-through;
}
.now-price {
  color: red;
  font-weight: bold;
  font-size: 14px;
}
.count-box {
  display: flex;
  align-items: center;
}
.btn1 {
  display: block;
  height: 100%;
}
</style>
