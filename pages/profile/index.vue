<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="profile.username !== user.username"
              :disabled="disableFollow"
              @click="handleUserAction"
            >
              <i class="ion-plus-round"></i>
              <template v-if="!profile.following"
                >&nbsp; Follow {{ profile.username }}</template
              >
              <template v-else>&nbsp; UnFollow {{ profile.username }}</template>
            </button>
            <nuxt-link
              to="/settings"
              class="btn btn-sm btn-outline-secondary action-btn"
              v-else
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link 
                exact
                class="nav-link"
                :class="{
                  active: !tab
                }" 
                :to="{
                  query: {

                  }
                }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" 
                :class="{
                  active: tab === 'favorited'
                }"
                exact :to="{
                  query: {
                    tab: 'favorited'
                  }
                }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug">
            <article-preview :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, followUser, unFollowUser } from "@/api/user.js";
import { mapState } from "vuex";
import { listArticles } from "@/api/article";
import ArticlePreview from "@/components/article-preview.vue";
export default {
  name: "profileIndex",
  middleware: "authenticated",
  watchQuery: ["tab"],
  components: {
    ArticlePreview,
  },
  data() {
    return {
      disableFollow: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  methods: {
    async handleUserAction() {
      this.disableFollow = true;
      const { following, username } = this.profile;
      const { data } = following
        ? await unFollowUser(username)
        : await followUser(username);
      this.profile = data.profile;
      this.disableFollow = false;
    },
  },
  async asyncData({ params, query }) {
    const { username } = params;
    const { tab } = query;
    let articleApi = listArticles({
        author: username,
    })
    
    if(tab && tab === 'favorited'){
      articleApi = listArticles({
        favorited: username
      })
    }

    const [profileRes, userArticleRes] = await Promise.all([
      getProfile(username),
      articleApi,
    ]);

    return {
      profile: profileRes.data.profile,
      articles: userArticleRes.data.articles,
      tab: tab
    };
  },
};
</script>

<style lang='scss' scoped>
</style>