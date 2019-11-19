<template>
  <div>
    <div class="addGoods" @click="$router.push('/addgoods')">添加</div>
    <form action="/">
      <van-search
        @clear="isShow=false"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div v-if="isShow" style="width:100%;">
      <van-swipe-cell v-for="item in searchlist" :key="item.id">
        <van-cell :border="false" :title="item.name">
          <span slot="default">商品上架时间：{{ item.ctime | dateFormat }}</span>
        </van-cell>
        <template slot="right">
          <van-button @click="deleted(item.id)" square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <div v-else class="searchHistory">
      <div class="top">
        <p>搜索历史</p>
        <van-icon @click="delHistory" name="delete" />
      </div>
      <div class="tagList" style="padding:5px 10px;">
        <van-tag
          @click="value=item"
          style="margin:0 5px;"
          v-for="item in searchHistory"
          :key="item"
          size="medium"
        >{{item}}</van-tag>
        <van-divider
          v-if="searchHistory.length==0"
          :style="{ color: '#333', borderColor: '#ccc', padding: '0 16px' }"
        >暂无搜索历史</van-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      searchlist: [],
      isShow: false,
      searchHistory: [],
    };
  },

  methods: {
    async onSearch() {
      if (this.value.trim().length == 0) {
        this.isShow = false;
        return this.$toast("请输入搜索内容");
      }
      const { data: res } = await this.$http.get("/getprodlist");
      console.log(res);
      this.searchlist = res.message;
      this.isShow = true;
      if (this.searchHistory.indexOf(this.value) != -1) {
        return;
      }
      this.searchHistory = this.searchHistory.splice(0, 10);
      this.searchHistory.unshift(this.value);
      localStorage.setItem("historysearch", JSON.stringify(this.searchHistory));
    },
    onCancel() {
      this.isShow = false;
    },
    addGoods() {
      this.$router.push("/addGoods");
    },
    searchChange() {
      console.log(this.value);
      if (this.value.trim().length == 0) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    delHistory() {
      this.searchHistory = [];
      localStorage.setItem("historysearch", JSON.stringify(this.searchHistory));
    },

    deleted(id) {
      this.$dialog.confirm({
        title: "警告",
        message: "是否确认删除"
      })
        .then(async() => {
            var {data:res}=await this.$http.get(
                `/delproduct/${id}`
            )
            if(res.status==0){
                 var { data: res } = await this.$http.get("/getprodlist");
                 this.searchlist=res.message
                this.$notify({ type: 'success', message: '删除成功' });
            }
        })
        .catch(() => {
        this.$notify({ type: 'danger', message: '删除失败' });
        });
    }
  },

  created() {
    this.searchHistory = JSON.parse(
      localStorage.getItem("historysearch") || "[]"
    );
  }
};
</script>

<style lang='less' scoped>
.searchHistory .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
}
.addGoods {
  position: fixed;
  top: 10px;
  font-size: 13px;
  color: #fff;
  right: 10px;
  z-index: 2;
}
</style>
