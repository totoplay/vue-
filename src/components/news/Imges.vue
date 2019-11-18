<template lang="">
    <div>
        <h4>{{imglist.title}}</h4>
        <p>
            <span class="time">发表时间:{{imglist.add_time | dateFormat}}</span> 
            <span class="click">点击:{{imglist.click}}</span>
        </p>
        <hr>
        <ul>
            <li v-for="(item,i) in imges" :key="item.index" @click="getImagePreview(i)">
                <van-image :src='item.src'/>
            </li>
        </ul>
        <div v-html="imglist.content"></div>
        <hr>
        
       <comments></comments>
    </div>
</template>

<script>
import comments from "../comment.vue";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      imglist: {},
      path: this.$route.params.id,
      imges: []
    };
  },
  created() {
    this.getimglist();
    this.getthum();
  },
  methods: {
    // 获取当前页面的数据
    // /api/getimageInfo/:imgid get
    async getimglist() {
      const { data: res } = await this.$http.get(`/getimageInfo/${this.path}`);

      this.imglist = res.message[0];
      console.log(this.imglist);
    },
    // 图片分享详情中的缩略图数组 /api/getthumimages/:imgid
    async getthum() {
      const { data: res } = await this.$http.get(`/getthumimages/${this.path}`);

      this.imges = res.message;
      console.log(this.imges);
    },
    getImagePreview(i) {
      var p = [];
      this.imges.forEach(item => {
        p.push(item.src);
      });
      ImagePreview({
        images: p,
        startPosition: i,
        onClose() {}
      });
    }
  },
  components: {
    comments
  }
};
</script>

<style lang="less" scoped>
h4 {
  text-align: center;
  color: #26a2ff;
  font-size: 15px;
}
p {
  overflow: hidden;
}
.time {
  float: left;
  font-size: 13px;
  color: #8f8f94;
}
.click {
  float: right;
  font-size: 13px;
  color: #8f8f94;
}
ul {
  list-style: none;
  margin: 10px 0;
  padding: 0 5px;
  overflow: hidden;
  li {
    float: left;
    width: 33.3333%;
    padding: 5px;
    box-sizing: border-box;
    .van-image {
      width: 100%;
      box-shadow: 1px 0 8px 1px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
