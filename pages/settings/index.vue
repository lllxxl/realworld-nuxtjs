<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="currentUser.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="currentUser.username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="currentUser.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="currentUser.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="currentUser.password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" 
                @click="handleUpdate" :disabled="disableBtn">
                Update Settings
              </button>
            </fieldset>
          </form>

          <hr>
          <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { updateUser } from '@/api/user.js'
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "settingsIndex",
  middleware: "authenticated",
  components: {},
  data() {
    return {
      currentUser: {
        email: '', 
        username: '', 
        password: '', 
        image: '', 
        bio: ''
      },
      disableBtn: false
    };
  },
  computed: {
    ...mapState(['user']),
  },
  mounted(){
    this.currentUser = {...this.user}
  },
  watch: {},
  methods: {
    async handleUpdate(){
      this.disableBtn = true;
      const {user} = await updateUser({
        ...this.currentUser
      })
      this.$router.push(`/profile/${user.username}`)
    },
    logout(){
      this.$store.commit("setUser", null);
      Cookie.remove('user');
      this.$router.push("/");
    }
  },
};
</script>

<style lang='scss' scoped>
</style>