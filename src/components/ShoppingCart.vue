<template>
  <div>
    <van-card
      v-for="item in carinfo"
      :key="item.id"
      :num="$store.getters.getcarcount[item.id]"
      :price="item.sell_price"
      :title="item.title"
      :thumb="item.thumb_path"
    >
      <div slot="footer">
        <van-stepper
          @change="countchange(item,$store.getters.getcarcount[item.id])"
          v-model="$store.getters.getcarcount[item.id]"
          min="1"
          integer
        />
      </div>
    </van-card>
    <!-- $store.getters.gettotalprice -->
    <van-submit-bar :price="gettotal" button-text="提交订单" @submit="onSubmit"  />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      carinfo: [],
    };
  },
  created() {
    this.getcarinfo();
  },
  methods: {
    // 获取购物车数据
    async getcarinfo() {
      // 从本地获取id拼接
      const idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }
      const { data: res } = await this.$http.get(
        `goods/getshopcarlist/${idArr.join(",")}`
      );

      this.carinfo = res.message;
      console.log(this.carinfo);
    },
    // 数量变化时
    countchange(item,count) {
      // 改变就覆盖
      const addgoods = {
        id:item.id,
        count:count
      };
      console.log(addgoods)
      this.$store.commit("editcarinfo",addgoods);
    },
    // 提交
    onSubmit() {}
  },
  computed: {
    gettotal() {
      console.log(this.$store.getters.gettotalprice);
      return parseInt(this.$store.getters.gettotalprice)
    }
  }
};
</script>

<style lang="less" scoped>
</style>