<template>
    <div @keydown="search">
        <form action="/">
  <van-search
    :v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
<div>搜索历史
    <span @click="deleteValue"><van-icon name="delete" /></span>
</div>
    <div :data="oldValue"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value:[],
            oldValue:[]
        }
    },
    methods: {
        onSearch(){

        },
        onCancel(){
            this.value=''
        },
        deleteValue(){
            this.oldValue=[]
        },
        search(){
            this.oldValue=this.value.concat(this.oldValue)
        }
    },
}
</script>

<style lang="less" scoped>
    span{
        float: right;
    }
</style>