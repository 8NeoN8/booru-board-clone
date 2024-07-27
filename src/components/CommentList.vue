<template>
  <div class="commentList">
    <div class="comment-amount">
      Total Comments: {{ comments.length }}
    </div>
    <ul class="comments-content">
      <template v-if="processedComments.length > 0" v-for="(comment, index) in processedComments" :key="index">
        <li class="comment">
          <div class="comment-top">
            <div class="comment-creator">
              {{ comment.creator }}
              <span class="comment-id">
                #{{ comment.id }}
              </span>
            </div>
            <div class="comment-options">
              
              <div class="report-comment">Report Spam</div>
              
              <div class="vote-comment">
                Vote:
                <div class="vote-up">
                  &#x25B2;
                </div>
                <div class="vote-down">
                  &#x25BC;
                </div>
              </div>
            </div>
          </div>
          <div class="comment-body">
            {{ comment.body }}
          </div>
        </li>
      </template>
    </ul>

    <div v-if="comments.length > 10" class="pagination">
      <div class="prevPage" @click="prevPage()">
        &#8249;
      </div>
      <div class="current-page">
        {{ currentPage }}
      </div>
      <div class="nextPage" @click="nextPage()">
        &#8250;
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:'CommentList',
  data() {
    return {
      currentPagination: {
        start: 0,
        end: 10
      },
      currentPage: 1
    }
  },
  props:{
    comments:{
      type: Array,
      default:[],
    }
  },
  computed:{
    processedComments(){
      let tempComments = this.comments
      tempComments = tempComments.slice(this.currentPagination.start, this.currentPagination.end)
      return tempComments
    }
  },
  created() {
  },
  methods: {
    nextPage(){
      this.currentPagination.start += 10
      this.currentPagination.end += 10
      if(this.processedComments.length < 1) {
        this.currentPagination.start -= 10
        this.currentPagination.end -= 10
        return
      }
      this.currentPage++
    },
    prevPage(){
      if(this.currentPage == 1) return
      this.currentPagination.start -= 10
      this.currentPagination.end -= 10
      this.currentPage--
    },
  },
}
</script>

<style>
@import '../assets/styles/commentList.scss'
</style>