<template>
  <div class="commentList">
    <div class="comment-amount">
      Total Comments: {{ comments.length }}
    </div>
    <ul class="comments-content">
      <template v-for="(comment, index) in comments" :key="index">
        <li class="comment">
          <div class="comment-creator">
            {{ comment.creator }}
          </div>
          <div class="comment-body">
            {{ comment.body }}
          </div>
        </li>
      </template>

    </ul>

  </div>
</template>

<script>
export default{
  name:'CommentList',
  data() {
    return {
      test: 'Comments'
    }
  },
  props:{
    comments:{
      type: Array,
      default:[],
    }
  }
}
</script>

<style>
@import '../assets/styles/commentList.scss'
</style>