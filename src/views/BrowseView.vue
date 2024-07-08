<template>
  <div class="browser-container">
    
    <template v-for="(post, index) in posts" :key="index">
      <div class="listed-post" @click="sendToPost(post)">
        <img :src="post.imageUrl" width="90px" height="90px">
      </div>
    </template>
    
  </div>
</template>

<script>
export default{
  name: 'BrowseView',
  data() {
    return {
      debug: 'debug',
      searchUrl: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=1girl',
      posts: [],
      requestTries: 0
    }
  },
  props:{
    tags:{
      type: String
    }
  },
  emits:['updateNav'],
  mounted() {
    this.$emit('updateNav', true)
  },
  created() {
    this.getPostByTags(this.tags)
  },
  methods: {
    async getPostByTags(tags){
      this.requestTries++
      if(tags){

        let separatedTags = tags.split(' ')
        let allTags = separatedTags[0]
        if(separatedTags.length > 1){
          allTags = ''
          for (let i = 0; i < separatedTags.length; i++) {
            allTags += `+${separatedTags[i]}`
          }
        }
      }


      let reqUrl = ''
      if(tags){
        reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=0&tags=${allTags}&json=1`)

      }else{

        reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=0&json=1`)
      }
      const req = await fetch(reqUrl)
      if(req){
        let res = await req.json()
        if(!res) this.getPostByTags(this.tags)
        if(res){
          this.posts = res
          //this.posts = this.posts.reverse()
          this.requestTries = 0
          this.processPostImages()
        }
      }
    },
    processPostImages(){
      for (let i = 0; i < this.posts.length; i++) {
        //* I SHOULD BE LOADING THE THUMBNAIL TO REDUCE SIZE OF REQUESTS BUT THEIR URLS ARE NOT NORMALIZED SO I CAN'T GET ALL OF THEM WORKING AT THE SAME TIME
        //* AND MAKING IT SO THAT IT CHECKS WHICH ONSE WORK WOULD INCREASE THE NETWORK LOAD EXPONENTIALLY BY HOW I KNOW RN HOW TO DO IT SO YEAH ALL ORIGINALS FOR NOW
        //`https://safebooru.org/thumbnails/${this.posts[i].directory}/thumbnail_${this.posts[i].image}?${this.posts[i].id}`
        this.posts[i].imageUrl = `https://safebooru.org//images/${this.posts[i].directory}/${this.posts[i].image}?${this.posts[i].id}`
      }
      console.log(this.posts);
    },
    sendToPost(post){
      this.$router.push(`/post/${post.id}`)
    }
  },
}
</script>

<style lang="scss">
  
</style>
