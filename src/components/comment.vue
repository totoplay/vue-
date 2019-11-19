<template>
  <div>
    <!-- 评论区 -->
    <div style="padding: 0px 5px;">
      <h4>发表评论</h4>
      <hr />
      <van-cell-group>
        <van-cell>
          <van-field
            v-model="addForm.content"
            rows="2"
            autosize
            type="textarea"
            placeholder="请输入留言"
            show-word-limit
          />
        </van-cell>
      </van-cell-group>
      <br />
      <van-button type="info" @click="submitComments()">发表评论</van-button>

      <!-- 评论 -->
      <div>
        <div class="cmt-list">
          <div v-for="(item,index) in commentsList" :key="index" class="cmt-item">
            <div
              class="cmt-item-header"
            >第{{index+1}}楼 &nbsp; {{ item.user_name }} &nbsp; {{ item.add_time | dateFormat }}</div>
            <div class="cmt-item-body">{{ item.content }}</div>
          </div>
        </div>
        <button @click="addcommentsList" class="btn">加载更多</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.params.id,
      // 评论的数据
      commentsList: [],
      // 页数
      pageindex: 1,
      // 留言
      addForm: {
        content: ""
      },
      index: 0
    };
  },
  created() {
      this.getComments()
  },
  methods: {
      async getComments(id) {
      const { data: res } = await this.$http.get(
        `getcomments/${this.$route.params.id}?pageindex=1`
      );
      this.commentsList =res.message
      console.log(this.commentsList);
    },
    // 提交评论
    async submitComments() {
      if(this.addForm.content.trim() == '') return this.$toast('留言不能为空')
      const { data: res } = await this.$http.post(
        `postcomment/${this.$route.params.id}`,
        this.addForm
      );
      this.$toast('评论成功');
      this.addForm.content = "";
      this.getComments();
    },
    // 加载更多
  async  addcommentsList(){
       this.pageindex += 1;
         const { data: res } = await this.$http.get(
        `getcomments/${this.$route.params.id}?pageindex=${this.pageindex}`
      );

        this.commentsList = this.commentsList.concat(res.message);
    }
  
  },
};
</script>

<style lang="less" scoped>
.van-cell-group .van-cell {
  height: 100px;
  border: 1px solid #ccc;
}
.van-button {
  width: 100%;
}

.body {
  line-height: 35px;
  text-indent: 2em;
  font-size: 12px;
}
.footer {
  height: 0;
  pointer-events: none;
}
.btn{
  height: 44px;
  border: 1px solid red;
  color: red;
  width: 100%;
  background: #fff;
}
.van-loading__text{
 position:absolute;
    left:-99999px;
    top:-90999px;
}
.cmt-list {
  padding-top: 5px;
}
.cmt-item {
  font-size: 12px;
}
.cmt-item-header {
  height: 30px;
  line-height: 30px;
  background-color: #eee;
}
.cmt-item-body {
  overflow-wrap: break-word;
  line-height: 30px;
  text-indent: 2em;
}
</style>