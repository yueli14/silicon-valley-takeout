<template>
  <div id="app">
    <router-view/>
    <Footer v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>

import Footer from "@/components/Footer/Footer";
import {mapActions} from 'vuex'

export default {
  //发送异步请求
  async mounted() {
    // let a = await reqFoodCategorys()
    // // console.log(a);
    // await this.$store.dispatch("getFoodCategory")
    // await this.$store.dispatch("getAddress")
    // await this.$store.dispatch("getShops")
    await this.getAddress()
    await this.getUserInfoSession()
  },
  methods: {
    ...mapActions(['getAddress','getUserInfoSession'])
  },

  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
