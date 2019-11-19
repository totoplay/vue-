<template>
  <div>
      <div class="box">
    <van-cell-group>
      <van-field v-model="value" placeholder="请输入商品名称" />
    </van-cell-group>
    <van-button type="info" class="btn" @click="addgoods">添加商品</van-button>
  </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
           value:''
        }
    },
    created() {
        
    },
    methods: {
       async addgoods(){
           if(this.value.trim()<=0){
             return  this.$notify('不能输入为空')
           }
           const {data:res}=await this.$http.post(
               `/addproduct`,
               {name:this.value}
           )
           console.log(this.value)
           this.value=''
           this.$notify({ type: 'success', message: '成功添加' });
            this.$router.push('/search')
        }
    },
};
</script>

<style lang="less" scoped>
.box{
        padding: 10px 15px;
       
}
.van-cell-group{
    margin-bottom: 25px;
}
.van-field{
 line-height: 24px;
}
.btn {
  width: 100%;
  font-size: 18px;
}
</style>