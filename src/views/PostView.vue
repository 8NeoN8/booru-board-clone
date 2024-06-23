<template>
  <div class="container">
    <img :src="`https://safebooru.org//images/${postInfo.directory}/${postInfo.image}?${postInfo.id}`" alt="">
    {{ postId }}
  </div>
</template>

<script>
export default{
  name: 'PostView',
  data() {
    return {
      debug: 'debug',
      postInfo: {}
    }
  },
  props:{
    postId:{
      type: String
    }
  },
  methods:{
    async getPostInfo(postId){
      let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&id=${postId}&json=1`)
      const req = await fetch(reqUrl)
      if(req){
        let res = await req.json()
        this.postInfo = res[Object.keys(res)[0]]
        console.log(this.postInfo);
        
      }
    }
  },
  mounted() {
    this.getPostInfo(this.postId)
  },
}
</script>

<style lang="scss">
  /*
    tag type 0 es general/metadata
    tag type 1 es artist
    tag type 2 es metadata NO FUNCIONA
    tag type 3 es copyright
    tag type 4 es chracter
  
  */
</style>
