<template>
  <div class="container post-container">

    <div class="post-info-sidebar">
      <div class="sidebar-content">
        <SearchBar @sendSearch="searchBrowse($event)"></SearchBar>
        <TagList :tagListObj="postTags" @ClickedTag="searchBrowse($event)"></TagList>
        <StatList :stats="postStats" @clickedUploader="searchBrowse($event)"></StatList>
        <div class="view-original-button-container">
          <button v-if="postInfo.sample && !originalView" class="view-original-button" @click="changeToOriginal()">View Original</button>
        </div>
      </div>
    </div>

    <div class="post-content">

      <div class="post-image">
        <img v-if="Object.keys(postInfo)" 
        :src="postInfo.sample ? sampleUrl : originalUrl" 
        :width="postInfo.sample ? postInfo.sample_width : postInfo.width" 
        :height="postInfo.sample ? postInfo.sample_height : postInfo.height">
      </div>

      <CommentList :comments="postComments"></CommentList>
      

    </div>    

  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const TagList = defineAsyncComponent({
  loader: () => import('../components/TagList.vue')
})
const CommentList = defineAsyncComponent({
  loader: () => import('../components/CommentList.vue')
})
const StatList = defineAsyncComponent({
  loader: () => import('../components/StatList.vue')
})
const SearchBar = defineAsyncComponent({
  loader: () => import('../components/SearchBar.vue')
})

export default{
  name: 'PostView',
  data() {
    return {
      debug: 'debug',
      postInfo: {},
      postComments: [],
      postTags: [],
      pageXML: '',
      postStats: {},
      originalView: false,
      postInfoNumberTries: 0,
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
  components:{
    TagList,
    StatList,
    CommentList,
    SearchBar
  },
  emits:['updateNav'],
  methods:{
    async getPostInfo(postId){
      this.postInfoNumberTries++
      try {
        let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&id=${postId}&json=1`)
        const req = await fetch(reqUrl)
        if(req){
          let res = await req.json()
          this.postInfo = res[Object.keys(res)[0]]
          console.log(this.postInfo);
          this.getPostTags(this.postInfo.tags.split(' '))
          this.postPageScrapper()
        }
      } catch (error) {
        console.log(error);
        if(this.postInfoNumberTries < 10){
          this.getPostInfo(postId)
        }
        if(this.postInfoNumberTries >= 10){
          console.log("post with id "+ this.postId +" couldn't be found"); //make a toast +//create a toast system I guess
        }

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
            created_at: comments[i].attributes.created_at.value.split(' ')[0],
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

      let tagsUrls = []
      for (let i = 0; i < tags.length; i++) {

        let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=tag&q=index&pid=0&name=${tags[i]}`)

        tagsUrls.push(fetch(reqUrl))

      }

      let responses = await Promise.all(tagsUrls)
      
      for (let i = 0; i < responses.length; i++) {

        let res = await responses[i].text()

        let parser = new DOMParser()
        let xml = parser.parseFromString(res, 'text/xml')

        this.postTags.push(this.parseXmlTagFunYay(xml))
      }

      this.orderPostTags()

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
      //orderedTags.metadata = this.postTags.filter((tag) => tag.type == 2)
      orderedTags.Copyright = this.postTags.filter((tag) => tag.type == 3)
      orderedTags.Character = this.postTags.filter((tag) => tag.type == 4)
      orderedTags.Artist = this.postTags.filter((tag) => tag.type == 1)
      orderedTags.General = this.postTags.filter((tag) => tag.type == 0)
      this.postTags = orderedTags
      console.log(this.postTags);
    },
    async postPageScrapper(){
      let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=post&s=view&id=${this.postId}`)
      const req = await fetch(reqUrl)

      if(req){
        let res = await req.text()
        
        let parser = new DOMParser()
        let xml = parser.parseFromString(res, 'text/html')

        this.pageXML = xml
        if(res) this.setPostStats()
      }
    },
    async setPostStats(){
      const createDate = new Date(this.postInfo.change * 1000)
      if(!this.pageXML) return
      let imgSourceContainer = this.pageXML
      imgSourceContainer = Array.from(imgSourceContainer.getElementsByTagName('li'))
      imgSourceContainer = imgSourceContainer.filter((x) => x.innerHTML.includes('Source'))[0]
      let imgSource = imgSourceContainer.innerText.split(': ')[1]


      let stats = {
        id: this.postInfo.id,
        posted: `${createDate.getFullYear()}-${createDate.getMonth()}-${createDate.getDate()}`,
        by: this.postInfo.owner,
        size: `${this.postInfo.width}x${this.postInfo.height}`,
        source: imgSource,
        rating: this.postInfo.rating,
        score: this.postInfo.score ? this.postInfo.score : 0,
        
      }
      
      this.postStats = stats
      //console.log(this.postStats);
    },
    changeToOriginal(){
      this.originalView = true
      this.postInfo.sample = false
    },
    searchBrowse(tags){
      console.log(tags);
      this.$router.push(`/browse/${tags}`)
    }
  },
  mounted() {
    this.$emit('updateNav')
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
@import '../assets/styles/postView.scss';

</style>
