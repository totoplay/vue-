<template>
  <div class="graphic">
    <h4>{{graphic.title}}</h4>
    <hr />
    <div v-html="graphic.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graphic: [],
      path: this.$route.params.id
    };
  },
  created() {
    this.getgraphic();
  },
  methods: {
    // 获取图文数据 /api/goods/getdesc/:id
    async getgraphic() {
      const { data: res } = await this.$http.get(`/goods/getdesc/${this.path}`);

      this.graphic = res.message[0];
      console.log(this.graphic);
    }
  }
};
</script>

<style lang="less" >
h4 {
  color: blue;
}

img{
   max-width: 375px!important;
}
</style>