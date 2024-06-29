<template>
  <div class="commentList">

    <ul class="comments-content">
      <div class="comment-amount">
        Total comments: {{ comments.length }}
      </div>
      <template v-for="(comment, index) in comments" :key="index">
        <li class="comment">
          {{ comment.creator }}
          <br>
          {{ comment.body }}
          <br>
          {{ comment.created_at }}
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