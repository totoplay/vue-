<template>
  <div>
    <van-icon @click="getin" name="vip-card-o" />
    <p>正在加班加点开发中，敬请期待！</p>
    <van-count-down :time="time" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 30 * 60 * 60 * 1000
    };
  },
  methods: {
    getin() {
     this.$dialog.alert({
        title: "标题",
        message: "弹窗内容"
      }).then(() => {
        // on close
      });

      this.$dialog.alert({
        message: "弹窗内容"
      }).then(() => {
        // on close
      });
    }
  }
};
</script>

<style lang="">
</style>