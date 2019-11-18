<template>
  <div>
      <!-- 评论区 -->
   <comments></comments>
  </div>
</template>

<script>
import comments from "../comment.vue";
export default {
  data() {
    return {
      path: this.$route.params.id
    };
  },

  components: {
    comments
  }
};
</script>

<style lang="less" scoped>
</style>