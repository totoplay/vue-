import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 调用main。js时从本地读购物车
var car = JSON.parse(localStorage.getItem('car') || '[]')

export default new Vuex.Store({
  state: {
    // 商品数据id 数量 价格
    car: car
  },
  mutations: {
    // 传送
    addtocar(state, addgoods) {
      var flag = false
      state.car.some(item => {
        if (item.id == addgoods.id) {
          item.count += parseInt(addgoods.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.car.push(addgoods)
      }
      //存储到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 在购物车修改时
    // editcarinfo(state, addgoods) {
    //   state.car.some(item => {
    //     if (item.id == addgoods.id) {
    //       item.count = parseInt(addgoods.count)
    //       return true
    //     }
    //   })

    //   localStorage.setItem('car', JSON.stringify(state.car))
    // },
    // 更新数据
    editcarinfo(state, addgoods) {
      state.car.some(item => {
        console.log(item)
        if (item.id == addgoods.id) {
          if (item.count !== addgoods.count) {
            item.count = addgoods.count
          }
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    // 获取总价
    gettotalprice(state) {
      let total = 0
      state.car.forEach(item => {
        total += item.count * item.price
      })
      return total * 100
    },
    // 首页那个图片数量
    getcount(state) {
      var c = 0
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    // 购物车里的数量
    getcarcount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    }
  }
})


