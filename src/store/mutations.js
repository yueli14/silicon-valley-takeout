// 更新state对象

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_SHOP_RATING,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO, DECREMENT_FOOD_COUNT, INCREMENT_FOOD_COUNT,
  CLEAR_CART_FOOD,
  RECEIVE_SEARCH_SHOP
} from './mutations-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORY](state, {category}) {
    state.category = category
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USERINFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USERINFO](state) {
    state.userInfo = ''
  },

  [RECEIVE_SHOP_RATING](state, {rating}) {
    state.shopRating = rating
  },
  [RECEIVE_SHOP_INFO](state, {info}) {
    state.shopInfo = info
  },
  [RECEIVE_SHOP_GOODS](state, {goods}) {
    state.shopGoods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    // if (!food.count) {
    //   Vue.set(this.food, 'count', 1)
    // } else {
    //   food.count++
    // }
    // console.log(food)
    if (food.count === 0) {
      state.cartFoods.push(food)
    }
    food.count++
  },
  [DECREMENT_FOOD_COUNT](state, {food}) {

    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART_FOOD](state) {
    //将食物中的个数设为0
    state.cartFoods.forEach(food=>food.count=0)
    state.cartFoods=[]
  },
  [RECEIVE_SEARCH_SHOP](state, {searchShop}) {
    state.searchShop = searchShop
  },
}