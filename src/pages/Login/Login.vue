<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class={on:isLoginStyle} @click="isLoginStyle=true">短信登录</a>
            <a href="javascript:;" :class={on:!isLoginStyle} @click="isLoginStyle=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:isLoginStyle}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!isPhone" class="get_verification" :class="{right_phone:isPhone}"
                        @click.prevent="getCode">
                  {{ countDown > 0 ? `已发送(${countDown})秒` : `获取验证码` }}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!isLoginStyle}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="!showPassword">
                  <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                  <div class="switch_button" :class="{on:showPassword}" @click="showPassword=!showPassword">
                    <div class="switch_circle" :class="{right:showPassword}"></div>
                    <span class="switch_text">{{ showPassword ? `abd` : `...` }}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha"
                       ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <!-- 返回原界面     -->
        <a class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
    <AlertTip :alert-text="alertText" v-show="isAlertTip" @closeTip="closeTip"></AlertTip>
  </div>
</template>

<script>
import AlertTip from "@/components/AlertTip/AlertTip";
import {reqPwdLogin, reqSendCode, reqSmsLogin} from "../../toserver/index"

export default {

  components: {AlertTip},
  data() {
    return {
      countDown: 0,
      phone: "",
      code: "",
      pwd: '',
      name: "",
      captcha: "",
      showPassword: false,
      //值为真时为短信登录
      isLoginStyle: true,
      isAlertTip: false,
      alertText: ''
    }
  },
  name: "Login",
  computed: {
    isPhone() {
      return /^1\d{10}$/.test(this.phone)
    }

  },

  methods: {
    closeTip() {
      this.isAlertTip = false
      this.alertText = ''
    },
    showAlert(text) {
      this.isAlertTip = true
      this.alertText = text
    },
    async login() {
      let result
      if (this.isLoginStyle) {
        const {isPhone, phone, code} = this
        if (!isPhone) {
          this.showAlert("请指定手机号")
          return
        } else if (!/\d{6}$/.test(code)) {
          this.showAlert("请指定验证码")
          return
        }
        //发送ajax请求进行登录
        result = await reqSmsLogin(phone, code)
      } else {
        const {name, pwd, captcha} = this
        if (!name) {
          this.showAlert("请指定用户名")
          return
        } else if (!pwd) {
          this.showAlert(" 请指定密码")
          return
        } else if (!captcha) {
          this.showAlert(" 请指定验证码")
          return
        }
        result = await reqPwdLogin({name, pwd, captcha})
      }
      //统一处理返回结果
      //停止计时器
      if (this.countDown) {
        this.countDown = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }
      if (result.code === 0) {
        const user = result.data
        // console.log(user);
        //将数据传到vuex保管
        this.$store.dispatch("recordUserInfo", user)
        //跳转到个人中心
        this.$router.replace('/profile')
      } else {
        const msg=result.msg
        this.showAlert(msg)
        //刷新验证码
        this.getCaptcha()
      }

    },
    async getCode() {
      // 实现倒计时，获取验证码的方法
      if (!this.countDown) {
        this.countDown = 30
        this.intervalId = setInterval(() => {
          this.countDown--
          if (this.countDown <= 0) {
            clearInterval(this.intervalId)
          }

        }, 1000)
        // 发送ajax请求，得到验证码
        const result = await reqSendCode(this.phone)
        console.log(result);

        if (result.code === 1) {
          //响应失败
          this.showAlert(result.msg)
          if (this.countDown) {
            this.countDown = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }
        }
      }
    },
    getCaptcha() {
      // console.log(this.$refs.captcha);
      this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now()
    }
  }
}
</script>

<style scoped lang="stylus">
.loginContainer
  width 100%
  height 100%
  background #fff

  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto

    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center

      .login_header_title
        padding-top 40px
        text-align center

        > a
          color #333
          font-size 14px
          padding-bottom 4px

          &:first-child
            margin-right 40px

          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774

    .login_content
      > form
        > div
          display none

          &.on
            display block

          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial

            &:focus
              border 1px solid #02a774

          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent

              &.right_phone
                color black

          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff

            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s, border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)

              &.off
                background #fff

                .switch_text
                  float right
                  color #ddd

              &.on
                background #02a774

              > .switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                transition transform .3s

                &.right
                  transform translateX(30px)

          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px

            > a
              color #02a774

        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0

      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999

    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px

      > .iconfont
        font-size 20px
        color #999
</style>