<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- <li>That email is already taken</li> -->
            <template v-for="(value, key) in errors">
              <li v-for="(item, index) in value" :key="index">
                {{ key + " " + item }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="handleSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// 只在客户端加载该包
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "LoginIndex",
  middleware: "notAuthenticated",
  components: {},
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {
        // a: ['1', '2'],
        // b: ['c', 'd']
      },
    };
  },
  computed: {
    isLogin() {
      // console.log(this.$route);
      return this.$route.name === "login";
    },
  },
  watch: {},
  methods: {
    async handleSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
            });
        this.$store.commit("setUser", data.user);
        // 持久化，防止页面刷新后数据丢失
        Cookie.set('user', data.user);
        this.$router.push("/");
      } catch (e) {
        console.log("error", e.response.data.errors);
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>