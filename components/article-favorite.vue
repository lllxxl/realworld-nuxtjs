<template>
  <button
    class="btn btn-outline-primary btn-sm"
    :class="{
      active: article.favorited,
      'pull-xs-right': mode === 'list'
    }"
    @click="handleFavoriteClick(article)"
    :disabled="article.disableFavorite"
  >
    <i class="ion-heart"></i>
    <template v-if="mode === 'list'"
      > {{ article.favoritesCount }}</template
    >
    <template v-else>
      &nbsp; <template v-if="article.favorited">UnFavorite</template>
      <template v-else>Favorite</template>
      <span class="counter">({{ article.favoritesCount }})</span>
    </template>
  </button>
</template>

<script>
import {
  addFavorite,
  cancelFavorite,
} from "@/api/article";
export default {
  name: "articleFavorite",
  components: {},
  props: {
    mode: {
      required: false,
      type: String,
    },
    originArticle: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      article: {
        disableFavorite: false
      }
    };
  },
  computed: {
    
  },
  watch: {},
  methods: {
    async handleFavoriteClick(article) {
      article.disableFavorite = true;
      const { slug, favorited } = article;
      const { data } = favorited
        ? await cancelFavorite(slug)
        : await addFavorite(slug);

      if (favorited) {
        article.favoritesCount--;
        article.favorited = false;
      } else {
        article.favoritesCount++;
        article.favorited = true;
      }
      article.disableFavorite = false;
    },
  },
  mounted() {
    this.article = {...this.originArticle, disableFavorite: false}
  },
};
</script>

<style lang='scss' scoped>
</style>