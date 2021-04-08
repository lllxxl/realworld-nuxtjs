<template>
  <div>
    <form class="card comment-form" @submit.prevent="handleAddComment">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="editComment"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        <nuxt-link class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <!-- <a href="" class="comment-author">
          <img
            src="http://i.imgur.com/Qr71crq.jpg"
            class="comment-author-img"
          />
        </a>
        &nbsp;
        <a href="" class="comment-author">Jacob Schmidt</a> -->
        <span class="date-posted">{{comment.createdAt | dayjs('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments } from "@/api/article.js";
import { mapState } from "vuex";
export default {
  name: "articleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      comments: [],
      editComment: '',
    };
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async handleAddComment(){
    const { slug } = this.article;
    const { data } = await addComments(slug, {
      comment: {
        body: this.editComment
      }
    })
    const { comment } = data;
    this.comments.push(comment);
    this.editComment = '';
  }
  },
  async mounted() {
    const { slug } = this.article;
    const { data } = await getComments(slug);
    this.comments = data.comments;
  },
};
</script>

<style lang='scss' scoped>
</style>