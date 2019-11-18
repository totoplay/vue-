<template>
  <div class="goods-container">
     <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div style="">
        <!-- 商品列表 -->
        <div class="goods-list">
          <!-- 商品item项 -->
          <div v-for="item in goods" :key="item.id" class="goods-item" @click="getGoods(item.id)">
            <img class="pic" :src="item.img_url" alt="" />
            <h1 class="title">{{ item.title }}</h1>
            <div class="info-box">
              <p class="price">
                <span>￥{{ item.sell_price }}</span>
                <span>￥{{ item.market_price }}</span>
              </p>
              <p class="info">
                <span>热卖中</span>
                <span>剩余{{ item.stock_quantity }}件</span>
              </p>
            </div>
          </div>
        </div>
    </div>
     </van-pull-refresh>
  </div>
</template>

<script>
export default {
    data() {
    return {
      isLoading: false,
      // 商品列表，默认为空
      goods: [],
      // 当前的页码值
      pageindex: 1,
    }
  },
created() {
    this.getGoodsList()
},
  methods: {
     onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    // 根据页码值获取商品列表数据
    async getGoodsList() {
       const { data: res } = await this.$http.get(
        `getgoods?pageindex=${this.pageindex}`
      );
      console.log(res)
      this.goods = res.message.concat(this.goods);
      console.log(this.goods);
    },
    getGoods(id){
      this.$router.push({
        path: `/goods/detail/${id}`
      });
    }
  }
}
</script>

<style lang="less" scoped>
.scroll-list-wrap {
  height: 350px;
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .goods-item {
    box-sizing: border-box;
    width: 48%;
    min-height: 260px;
    border: 1px solid #eee;
    margin: 8px 1% 0 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    .pic {
      width: 100%;
      min-height: 178px;
    }
    .title {
      font-size: 13px;
      font-weight: bold;
    }
    .info-box {
      font-size: 12px;
      background-color: #eee;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 5px;
      margin-top: 5px;
      .info {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>