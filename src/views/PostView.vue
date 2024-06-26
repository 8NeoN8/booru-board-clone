<template>
  <div class="container">

    <div class="navbar"></div>

    <div class="flex">
      <div class="post-info-sidebar"></div>
      <div class="post-content">

        <div class="post-image"></div>

        <div class="post-comments"></div>

      </div>
    </div>

    <!-- <div class="original-image" :if="postInfo.sample == false" :v-show="postInfo.sample == false">
    </div>
    <div class="sample-image" :if="postInfo.sample == true" :v-show="postInfo.sample == true">
      <img :src="sampleUrl" alt="">
    </div> -->
    <img v-if="Object.keys(postInfo)" :src="postInfo.sample ? sampleUrl : originalUrl" alt="">
    {{ postId }}
  </div>
</template>

<script>
export default{
  name: 'PostView',
  data() {
    return {
      debug: 'debug',
      postInfo: {},
      postComments: [],
      postTags: []
    }
  },
  computed:{
    originalUrl(){
      return `https://safebooru.org//images/${this.postInfo.directory}/${this.postInfo.image}?${this.postInfo.id}`
    },
    sampleUrl(){
      return `https://safebooru.org//samples/${this.postInfo.directory}/sample_${this.postInfo.image}?${this.postInfo.id}`
    },
  },
  props:{
    postId:{
      type: String,
      default: '4959145'
    }
  },
  methods:{
    async getPostInfo(postId){
      try {
        let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&id=${postId}&json=1`)
        const req = await fetch(reqUrl)
        if(req){
          let res = await req.json()
          this.postInfo = res[Object.keys(res)[0]]
          console.log(this.postInfo);
          //this.getPostTags(this.postInfo.tags.split(' '))
        }
      } catch (error) {
        console.log(error);
        this.getPostInfo(postId)
      }
    },
    async getPostComments(postId){

      let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=comment&q=index&post_id=${postId}`)
      const req = await fetch(reqUrl)
      if(req){
        let res = await req.text()
       
        let parser = new DOMParser()
        let xml = parser.parseFromString(res, "text/xml")
        
        this.postComments = this.parseXmlCommentsFunYay(xml)
        if(this.postComments.length < 1) console.log('no comments'); else console.log('comments: ', this.postComments.length);
      }
    },
    parseXmlCommentsFunYay(xml){
      let parsedComments = []
      let comments = xml.getElementsByTagName('comment')
      if(comments){
        for (let i = 0; i < comments.length; i++) {
          
          let comment = {
            created_at: comments[i].attributes.created_at.value,
            post_id: comments[i].attributes.post_id.value,
            body: comments[i].attributes.body.value,
            creator: comments[i].attributes.creator.value,
            creator_id: comments[i].attributes.creator_id.value,
            id: comments[i].attributes.id.value,
          }
          parsedComments.push(comment)
        }
      }

      return parsedComments
    },
    async getPostTags(tags){
      this.postTags = []
      console.log(tags);
      for (let i = 0; i < tags.length; i++) {

        
        let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=tag&q=index&pid=0&name=${tags[i]}`)
        const req = await fetch(reqUrl)

        if(req){
          let res = await req.text()

          let parser = new DOMParser()
          let xml = parser.parseFromString(res, 'text/xml')


          this.postTags.push(this.parseXmlTagFunYay(xml))
        }

      }

      this.orderPostTags()

      console.log(this.postTags);


    },
    parseXmlTagFunYay(xml){
      let tagXml = xml.getElementsByTagName('tag')[0]
      

      let tag = {
        type: tagXml.attributes.type.value,
        count: tagXml.attributes.count.value,
        name: tagXml.attributes.name.value,
        id: tagXml.attributes.id.value,

      }

      return tag
    },
    orderPostTags(){
      let orderedTags = {}
      orderedTags.general = this.postTags.filter((tag) => tag.type == 0)
      orderedTags.artist = this.postTags.filter((tag) => tag.type == 1)
      orderedTags.metadata = this.postTags.filter((tag) => tag.type == 2)
      orderedTags.copyright = this.postTags.filter((tag) => tag.type == 3)
      orderedTags.character = this.postTags.filter((tag) => tag.type == 4)
      this.postTags = orderedTags
      console.log(this.postTags);
    },
  },
  mounted() {
    this.getPostInfo(this.postId)
    this.getPostComments(this.postId)
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
