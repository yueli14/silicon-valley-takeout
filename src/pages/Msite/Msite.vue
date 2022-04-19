<template>
  <section class="msite">
    <!--    首页头部-->
    <!--    <header class="header">-->
    <!--              <span class="header_search">-->
    <!--                <i class="iconfont icon-sousuo"></i>-->
    <!--              </span>-->
    <!--      <span class="header_title">-->
    <!--                <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>-->
    <!--              </span>-->
    <!--      <span class="header_login">-->
    <!--                <span class="header_login_text">登录|注册</span>-->
    <!--              </span>-->
    <!--    </header>-->
    <!-- 插槽语法-->
    <CommonHeader :title="address.name">
      <template v-slot:left>
        <span class="header_search">
            <router-link class="iconfont icon-sousuo" to="/search"></router-link>
          </span>
      </template>
      <template v-slot:right>
        <router-link class="header_login" :to="userInfo._id? `/userinfo`:`/login`">
          <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
          <span class="header_login_text" v-else>
           <i class="iconfont icon-person"></i>
        </span>
        </router-link>
      </template>
    </CommonHeader>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoryArr.length">
        <div class="swiper-wrapper">
          <!--          循环json-->
          <div class="swiper-slide" v-for="(category,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(type,index) in category" :key="type.id">
              <div class="food_container">
                <img :src="baseImageUrl+type.image_url">
              </div>
              <span>{{ type.title }}</span>
            </a>

          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
import CommonHeader from "@/components/CommonHeader/CommonHeader";
import ShopList from "@/components/ShopList/ShopList";
import "swiper/swiper.min.css"
import Swiper from 'swiper'
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  methods: {
    ...mapActions(['getFoodCategory', 'getShops',])
  },
  //绑定全局vuex属性
  computed: {
    ...mapState(['address', 'category', 'shops','userInfo']),
    //返回一个二级数组
    categoryArr() {
      const {category} = this
      const arr = []
      let minArr = []
      category.forEach(
          c => {
            // 如果当前小数组已经满了, 创建一个新的
            if (minArr.length === 8) {
              minArr = []
            }
            // 如果minArr是空的, 将小数组保存到大数组中
            if (minArr.length === 0) {
              arr.push(minArr)
            }
            // 将当前分类保存到小数组中
            minArr.push(c)
          }
      )
      return arr;

    }
  },
  watch: {
    category(newValue, oldValue) {
      this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
        // 创建一个Swiper实例对象, 来实现轮播
        new Swiper('.swiper-container', {
          loop: true, // 可以循环轮播
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })

      })
    }
  },
  name: "Msite",
  components: {
    CommonHeader,
    ShopList
  },
  mounted() {
    this.getFoodCategory();
    this.getShops();

  }
}
</script>

<style scoped lang="stylus">

@import "../../common/stylus/mixins.styl"
.msite //首页
  width 100%

  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff

    .swiper-container
      width 100%
      height 100%
      overflow hidden

    .swiper-wrapper
      width 100%
      height 100%

      .swiper-slide
        display flex
        justify-content center
        align-items flex-start
        flex-wrap wrap

        .link_to_food
          width 25%

          .food_container
            display block
            width 100%
            text-align center
            padding-bottom 10px
            font-size 0

            img
              display inline-block
              width 50px
              height 50px

          span
            display block
            width 100%
            text-align center
            font-size 13px
            color #666

    .swiper-pagination
      > span.swiper-pagination-bullet-active
        background #02a774

  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff

    .shop_header
      padding 10px 10px 0

      .shop_icon
        margin-left 5px
        color #999

      .shop_header_title
        color #999
        font-size 14px
        line-height 20px


</style>