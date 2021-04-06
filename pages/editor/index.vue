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
import { createArticle, updateArticle } from '@/api/article.js';
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
    };
  },
  computed: {},
  watch: {},
  methods: {
    async handleSubmit(){
      const { params } = this.$route;
      const { slug } = params;

      const { article } = await slug? updateArticle(slug, {
        article: this.article
      }): createArticle({
        article: this.article
      })
      this.$router.push(`/article/${article.slug}`);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>