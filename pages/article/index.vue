<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :originArticle="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :originArticle="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import ArticleMeta from "@/components/article-meta.vue";
import MarkdownIt from "markdown-it";
import ArticleComments from "../../components/article-comments.vue";
export default {
  name: "article",
  components: {
    ArticleMeta,
    ArticleComments,
  },
  data() {
    return {};
  },
  async asyncData({ params }) {
    const { slug } = params;
    const { data } = await getArticle(slug);
    // console.log(data);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);

    return {
      article,
    };
  },
  // SEO
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang='scss' scoped>
</style>