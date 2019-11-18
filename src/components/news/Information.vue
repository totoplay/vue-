<template>
  <div>
    <van-tabs @click="getothimg(num)" v-model="num">
      <van-tab v-for="index in imgcategory" :title="index.title" :key="index.id">
        <ul>
          <li v-for="index in images" :key="index.id" @click="goimg(index.id)">
            <van-image :src="index.img_url" />
            <div>
              <p>{{index.title}}</p>
              <p>{{index.zhaiyao}}</p>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分类的名字
      imgcategory: [],
      //   当前分类下的数据
      images: [],
      num: 0,
      allList: []
    };
  },
  created() {
    this.getimgcategory();
    this.getimages(0);
  },
  methods: {
    // 用于获取图片列表页面上面的分类信息获取 /api/getimgcategory 请求方式	Get
    async getimgcategory() {
      const { data: res } = await this.$http.get(`/getimgcategory`);
      if (res.status === 0) {
        this.imgcategory = res.message;
        this.imgcategory.unshift({ id: 0, title: "全部" });
      }
      console.log(res.message);
      this.imgcategory = res.message;
    },
    //用于获取点击首页上的“图片分享”后进入到的列表数据 /api/getimages/:cateid   Get
    async getimages() {
      const { data: res } = await this.$http.get(`/getimages/${0}`);
      console.log(res);
      this.images = res.message;
    },
    async getothimg(num) {
      console.log(this.imgcategory[num]);
      const { data: res } = await this.$http.get(
        `/getimages/${this.imgcategory[num].id}`
      );
      console.log(res);
      this.images = res.message;
    },
    goimg(id) {
      this.$router.push({
        path: `/photo/info/${id}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  padding: 0 10px;
}
li {
  margin-top: 5px;
  width: 100%;
  height: 300px;
  display: block;
  position: relative;
  .van-image {
    width: 100%;
    height: 100%;
    object-fit: cover !important;
  }
  div {
    font-size: 12px;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    height: 75px;
    position: absolute;
  }
}
</style>