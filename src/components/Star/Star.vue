<template>
  <!--  动态渲染图片星-->
  <div class="star" :class="`star-`+size">
    <span class="star-item" v-for="(star,index) in stars" :class="star" :key="index"></span>
    <!--    <span class="star-item on"></span>-->
    <!--    <span class="star-item on"></span>-->
    <!--    <span class="star-item on"></span>-->
    <!--    <span class="star-item half"></span>-->
    <!--    <span class="star-item off"></span>-->
  </div>
</template>

<script>
export default {
  name: "Star",
  props: {
    score: Number,
    size: Number
  },
  computed: {
    //通过计算得到数组
    /*
      3.2: 3 + 0 + 2
      3.5: 3 + 1 + 1
       */
    stars() {
      const {score} = this
      const arr = []
      const a = "on"
      const b = "half"
      const c = "off"
      //取整数那大星
      let d = Math.floor(score)
      for (let i = 0; i < d; i++) {
        arr.push(a)
      }
      //取小数，判断小星或者黑星,防止精度丢书
      if ((score - d) * 10 >= 5) {
        arr.push(b)
      }
      //添加黑星
      while (arr.length < 5) {
        arr.push(c)
      }

      return arr

    },
  }
}
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0

  .star-item
    display inline-block
    background-repeat no-repeat

  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px

      &:last-child
        margin-right: 0

      &.on
        bg-image('./images/stars/star48_on')

      &.half
        bg-image('./images/stars/star48_half')

      &.off
        bg-image('./images/stars/star48_off')

  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px

      &:last-child
        margin-right 0

      &.on
        bg-image('./images/stars/star36_on')

      &.half
        bg-image('./images/stars/star36_half')

      &.off
        bg-image('./images/stars/star36_off')

  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px

      &:last-child
        margin-right 0

      &.on
        bg-image('./images/stars/star24_on')

      &.half
        bg-image('./images/stars/star24_half')

      &.off
        bg-image('./images/stars/star24_off')

</style>