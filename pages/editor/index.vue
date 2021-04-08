<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  v-model="article.body"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.tagList"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                @click="handleSubmit"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                :disabled="disableSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, updateArticle, getArticle } from '@/api/article.js';
export default {
  name: "editor",
  middleware: "authenticated",
  components: {},
  data() {
    return {
      article: {
        title: null,
        description: null,
        body: null,
        tagList: null,
      },
      disableSubmit: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    async handleSubmit(){
      this.disableSubmit = true;
      const { params } = this.$route;
      const { slug } = params;

      const result = slug? updateArticle(slug, {
        article: this.article
      }): createArticle({
        article: this.article
      })
      const { data } = await result;
      const { article } = data;
      this.$router.push(`/article/${article.slug}`);
      this.disableSubmit = false;
    }
  },
  async mounted(){
    const { params } = this.$route;
    const { slug } = params;
    if(!slug) return;
    const { data } = await getArticle(slug);
    const { article } = data;
    this.article = article;
  }
};
</script>

<style lang='scss' scoped>
</style>