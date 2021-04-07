<template>
  <div class="article-preview">
    <div class="article-meta">
      <nuxt-link :to="`/profile/${article.author.username}`">
        <img :src="article.author.image" />
      </nuxt-link>
      <div class="info">
        <!-- <a href="" class="author">Eric Simons</a> -->
        <nuxt-link :to="`/profile/${article.author.username}`" class="author">
          {{ article.author.username }}
        </nuxt-link>
        <span class="date">{{
          article.createdAt | dayjs("MMM DD, YYYY")
        }}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="article.favorited ? 'active' : ''"
        @click="handleFavoriteClick(article)"
        :disabled="article.disableFavorite"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>
  </div>
</template>

<script>
import {
  addFavorite,
  cancelFavorite,
} from "@/api/article";
export default {
  name: "articlePreview",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async handleFavoriteClick(article) {
      article.disableFavorite = true;
      const { slug, favorited } = article;
      const { data } = favorited ? 
      await cancelFavorite(slug) : 
      await addFavorite(slug)

      if(favorited){
        article.favoritesCount --;
        article.favorited = false;
      }else{
        article.favoritesCount ++;
        article.favorited = true;
      }
      article.disableFavorite = false;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>