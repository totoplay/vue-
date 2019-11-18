<template>
  <div class="news-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="header_box">
      <div class="news-item" v-for="item in newsList" :key="item.id" @click="golist(item.id)">
        <div class="Imgs">
          <img :src="item.img_url" />
        </div>
        <div class="news-info">
          <div class="title">{{item.title}}</div>
          <div class="time">
            <span>发表时间:{{item.add_time | dateFormat}}</span>
            <span>点击:{{item.click}}</span>
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
      count: 0,
      isLoading: false,
      newsList: []
    };
  },
  created() {
    //   getnewslist
    this.getNewsList();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    async getNewsList() {
      const { data: res } = await this.$http.get("getNewsList");
      this.newsList = res.message;
      console.log(this.newsList);
    },
    golist(id) {
      this.$router.push({
        path: `/news/detail/${id}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.news-list {
  .news-item {
    display: flex;
    padding: 10px 10px;
    border-top: 1px solid #eee;
    img {
      width: 60px;
      height: 60px;
    }
    .news-info {
      padding-left: 10px;
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: space-around;
      .title {
        font-size: 13px;
        font-weight: bold;
      }
      .time {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #26a2ff;
      }
    }
  }
}
</style>