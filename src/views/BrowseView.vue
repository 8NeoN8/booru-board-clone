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
      requestTries: 0,
      browsePage: 0,
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
      console.log('fetching images');
      this.requestTries++
      let allTags = ''
      if(tags){

        let separatedTags = tags.split(' ')
        allTags = separatedTags[0]
        if(separatedTags.length > 1){
          allTags = ''
          for (let i = 0; i < separatedTags.length; i++) {
            allTags += `+${separatedTags[i]}`
          }
        }
      }


      let reqUrl = ''
      if(tags){
        reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=${this.browsePage}&tags=${allTags}&json=1`)
      }else{
        reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=${this.browsePage}&json=1`)
      }
      const req = await fetch(reqUrl)
      if(!req) return
      let res = await req.json()
      if(!res){
        this.getPostByTags(this.tags)
        return
      }
      if(res){
        this.posts = res
        this.requestTries = 0
        this.processPostImages()
      }
    },
    processPostImages(){
      for (let i = 0; i < this.posts.length; i++) {
        let onlyImageName = this.posts[i].image.split('.')[0];
        this.posts[i].imageUrl = `https://safebooru.org/thumbnails/${this.posts[i].directory}/thumbnail_${onlyImageName}.jpg?${this.posts[i].id}`

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
