<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="tab === 'your_feed' ? 'active' : ''"
                  v-if="user"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  exact
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="tab === 'global_feed' ? 'active' : ''"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  exact
                >
                  Global Feed
                </nuxt-link>
                <!-- <a class="nav-link active" href="">Global Feed</a> -->
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="tab === 'tag' ? 'active' : ''"
                  :to="{
                    name: 'home',
                    query: {
                      tag,
                      tab: 'tag',
                    },
                  }"
                  exact
                >
                  #{{ tag }}
                </nuxt-link>
                <!-- <a class="nav-link active" href="">Global Feed</a> -->
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug">
            <article-preview :article="article"/>
          </div>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: currentPage === page
              }"
              v-for="page in totalPages"
              :key="page"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page,
                    tag: $route.query.tag,
                    tab,
                  },
                }"
                >{{ page }}</nuxt-link
              >
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    tag: tag,
                    tab: 'tag',
                  },
                }"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  listArticles,
  listFeedArticles,
  addFavorite,
  cancelFavorite,
} from "@/api/article";
import { listTags } from "@/api/tags";
import ArticlePreview from '../../components/article-preview.vue';

export default {
  name: "HomeIndex",
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query }) {
    const currentPage = parseInt(query.page || 1);
    const limit = 20;
    const tab = query.tab || "global_feed";
    const tag = query.tag;
    const fetchApi =
      tab === "your_feed"
        ? listFeedArticles({
            limit,
            offset: currentPage * limit,
          })
        : listArticles({
            limit,
            offset: currentPage * limit,
            tag,
          });
    try {
      const [articleRes, tagRes] = await Promise.all([fetchApi, listTags()]);
      // console.log("tagRes", tagRes);
      const { articles, articlesCount } = articleRes.data;
      articles.forEach(item => {
        item.disableFavorite = false;
      })
      const { tags } = tagRes.data;
      return {
        articles,
        articlesCount,
        tags,
        currentPage,
        limit,
        tab,
        tag,
      };
    } catch (e) {}
  },
  components: {ArticlePreview},
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"]),
    totalPages() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
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