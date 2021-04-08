<template>
  <div class="article-meta">
    <!-- <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a> -->
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <!-- <a href="" class="author">Eric Simons</a> -->
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | dayjs("MMM DD, YYYY") }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      v-if="article.author.username !== user.username"
      :class="{
        active: article.author.following,
      }"
      @click="handleFollow"
      :disabled="isLoading"
    >
      <i class="ion-plus-round"></i>
      &nbsp; <template v-if="article.author.following">UnFollow</template>
      <template v-else>Follow</template>
      {{ article.author.username }}
    </button>
    <nuxt-link
      class="btn btn-sm btn-outline-primary"
      v-else
      :to="{
        name: 'editorEdit',
        params: {
          slug: article.slug,
        },
      }"
    >
      <i class="ion-edit"></i>
      &nbsp; Edit Article
    </nuxt-link>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      v-if="article.author.username !== user.username"
      :class="{
        active: article.favorited,
      }"
      :disabled="isLoading"
    >
      <i class="ion-heart"></i>
      &nbsp; <template v-if="article.favorited">UnFavorite</template>
      <template v-else>Favorite</template>
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    <button class="btn btn-sm btn-outline-danger" :disabled="isLoading" v-else @click="handleDelete">
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { followUser, unFollowUser } from "@/api/user.js";
import { deleteArticle } from '@/api/article.js';
export default {
  name: "articleMeta",
  components: {},
  props: {
    originArticle: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      article: {
        author: {}
      }
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  methods: {
    async handleFollow() {
      this.isLoading = true;
      const { author } = this.article;
      const { following, username } = author;
      const api = following ? unFollowUser : followUser;
      const response = await api(username);
      const { data } = response;
      const { profile } = data;
      this.article.author.following = profile.following
      this.isLoading = false;
    },
    async handleDelete(){
      this.isLoading = true;
      const result = await deleteArticle(this.article.slug)
      this.$router.push('/')
    }
  },
  mounted(){
    this.article = this.originArticle;
  }
};
</script>

<style lang='scss' scoped>
</style>