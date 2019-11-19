<template>
  <div class="news">
    <!-- 新闻主体 -->
    <h3 class="tit">{{news.title}}</h3>
    <div class="time">
      <span>发表时间:{{news.add_time | dateFormat}}</span>
      <span>点击次数:{{news.click}}</span>
    </div>
    <hr />
    <div v-html="news.content">{{news.content}}</div>

    <!-- 评论区 -->
    <comments></comments>
  </div>
</template>

<script>
import comments from "../comment.vue";
export default {
  data() {
    return {
      // 新闻的数据
      news: {},
      path: this.$route.params.id,
      // 评论的数据
      commentsList: [],
      // 页数
      pageindex: 1,
      // 留言
      addForm: {
        content: ""
      },
      index: 0,
    };
  },
  created() {
    this.getnews();
    this.getComments();
  },
  methods: {
    // 获取新闻详情
      async getnews(id) {
        const { data: res } = await this.$http.get(
          `getnew/${this.$route.params.id}`
        );
        console.log(res);
        this.news = res.message[0];
        console.log(this.news);
    },
    // 获取评论
    async getComments(id) {
      const { data: res } = await this.$http.get(
        `getcomments/${this.$route.params.id}?pageindex=${this.pageindex}`
      );
      this.commentsList = res.message.concat(this.commentsList);
      console.log(this.commentsList);
    },
    // 提交评论
    async submitComments(id) {
      const { data: res } = await this.$http.post(
        `postcomment/${this.$route.params.id}`,
        this.addForm
      );
      this.addForm.content = "";
      this.getComments();
    },
    addcommentsList() {
      this.pageindex += 1;
      this.getComments();
    }
  },
  components: {
    comments
  }
};
</script>

<style lang="less" scoped>
.news {
  padding: 0 5px;
}
.tit {
  color: #1989fa;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
}

.time {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: #26a2ff;
}
</style>