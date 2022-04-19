/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATING,
  RECEIVE_SHOP_INFO, DECREMENT_FOOD_COUNT, INCREMENT_FOOD_COUNT,
  CLEAR_CART_FOOD,
  RECEIVE_SEARCH_SHOP
} from './mutations-types'
import {
  reqAddress,
  reqFoodCategory,
  reqLogout,
  reqShops,
  reqUserInfo,
  reqShopInfo,
  reqShopGoods,
  reqShopRating,
  reqSearchShop
} from '../toserver'


export default {
  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  async getFoodCategory({commit}) {

    const result = await reqFoodCategory()
    if (result.code === 0) {
      const category = result.data
      commit(RECEIVE_CATEGORY, {category})
    }
  },
  async getShops({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqShops(geohash)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  async getSearchShops({commit, state},keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash,keyword)
    if (result.code === 0) {
      const searchShop = result.data
      commit(RECEIVE_SEARCH_SHOP, {searchShop})
    }
  },
  recordUserInfo({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },

  async getUserInfoSession({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }

  },
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USERINFO)
    }
  },
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_SHOP_GOODS, {goods})
      callback && callback()
    }
  },
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      // console.log(info);
      commit(RECEIVE_SHOP_INFO, {info})
    }
  },
  async getShopRating({commit}) {
    const result = await reqShopRating()
    if (result.code === 0) {
      const rating = result.data
      commit(RECEIVE_SHOP_RATING, {rating})
    }
  },
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      // console.log(food);
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  clearCart({commit}) {
    commit(CLEAR_CART_FOOD)
  }

}