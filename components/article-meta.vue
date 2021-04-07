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
    >
      <i class="ion-plus-round"></i>
      &nbsp; <template v-if="article.author.following">UnFollow</template>
      <template v-else>Follow</template>
      {{ article.author.username }} <span class="counter">(10)</span>
    </button>
    <button
      class="btn btn-sm btn-outline-secondary"
      v-else
    >
      <i class="ion-plus-round"></i>
      &nbsp; 
      Edit Article
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      v-if="article.author.username !== user.username"
      :class="{
        active: article.favorited,
      }"
    >
      <i class="ion-heart"></i>
      &nbsp; <template v-if="article.favorited">UnFavorite</template>
      <template v-else>Favorite</template>
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    <button
      class="btn btn-sm btn-outline-danger"
      v-else
    >
      <i class="ion-plus-round"></i>
      &nbsp; 
      Delete Article
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "articleMeta",
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
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {},
};
</script>

<style lang='scss' scoped>
</style>