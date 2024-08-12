<template>
  <NavBar></NavBar>
  <div class="browser-container">
    <SideBar :tags="postsTags" @sendSearch="navBarSearch($event)"></SideBar>
    <div class="browser-content">
      <div class="posts">
        <template v-for="(post, index) in posts" :key="index">
          <div class="listed-post" :id="`post-${index}-${post.id}`" @click="sendToPost(post)">
            <img class="post-thumbnail" :src="post.imageUrl">
          </div>
        </template>
      </div>
      
      <div class="pagination">
  
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
    
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
const SideBar = defineAsyncComponent({
  loader: () => import('../components/SideBar.vue')
})
const NavBar = defineAsyncComponent({
  loader: () => import('../components/NavBar.vue')
})

export default{
  name: 'BrowseView',
  data() {
    return {
      debug: 'debug',
      searchUrl: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=1girl',
      posts: [],
      requestTries: 0,
      browsePage: 0,
      postsTags: [],
    }
  },
  props:{
    tags:{
      type: String
    }
  },
  computed:{
    currentPage(){
      return this.browsePage + 1
    }
  },
  components:{
    SideBar,
    NavBar
  },
  updated() {
  },
  mounted() {
    //this.getPostByTags(this.tags)
    //console.log(window.history); //* esto es pa ver si cuando se vuelve aqui ver si cargar los posts viejos o hacer otro fetch
  },
  created() {
    this.getPostByTags(this.tags)
    if(this.tags) console.log(this.tags);
  },
  methods: {
    async getPostByTags(tags){
      this.posts = []
      if(this.requestTries >= 10) {
        throw new Error("No post were found with this tags or they couldn't be reached, please write an issue on github if it keeps happening");
      }
      this.requestTries++
      let allTags = ''
      if(tags){
        let separatedTags = tags.split(' ')
        allTags = separatedTags.join('+')
        console.log(allTags);
      }

      let reqUrl = ''
      if(tags != null && tags != ''){
        reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=${this.browsePage}&tags=${allTags}&json=1`)
      }else{
        reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=${this.browsePage}&json=1`)
      }
      try {
        const req = await fetch(reqUrl)
        let res = await req.json()
        this.posts = res
        this.requestTries = 0
        this.processPostImages()
        this.getPostsTags()
      } catch (error) {
        console.error('This error ocurred: ',error);
        this.getPostByTags(tags)
      }
    },
    processPostImages(){
      for (let i = 0; i < this.posts.length; i++) {
        let onlyImageName = this.posts[i].image.split('.')[0];
        this.posts[i].imageUrl = `https://safebooru.org/thumbnails/${this.posts[i].directory}/thumbnail_${onlyImageName}.jpg?${this.posts[i].id}`

      }
    },
    async getPostsTags(){
      let allPostTags = []
      for (let i = 0; i < this.posts.length; i++) {
        let newArr = this.posts[i].tags.split(' ')
        allPostTags.push(...newArr)
      }
      allPostTags = [...new Set(allPostTags)]
      
      let cutTags = allPostTags.slice(0,100)
      console.log(cutTags);
      this.fetchTags(cutTags)

    },
    async fetchTags(tagArr){
      let batchesDone = 0
      let reqsPerBatch = 10
      let currentBatch = 0
      let reqUrls = []

      while (currentBatch < 100) {
        let responses = []
        reqUrls = []
        for (let i = currentBatch; i < (currentBatch + reqsPerBatch); i++) {
          reqUrls.push(fetch('https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=tag&q=index&pid=0&name=${tagArr[i]}`)))
        }

        responses = await Promise.all(reqUrls)
        
        for (let i = 0; i < responses.length; i++) {

          let res = await responses[i].text()

          let parser = new DOMParser()
          let xml = parser.parseFromString(res, 'text/xml')
          
          this.postsTags.push(this.parseTagsXml(xml))
        }
        currentBatch += reqsPerBatch
      }
      this.orderTags()
    },
    parseTagsXml(xml){
      let tagXml = xml.getElementsByTagName('tag')[0]
      
      let tag = {
        type: tagXml.attributes.type?.value,
        count: tagXml.attributes.count?.value,
        name: tagXml.attributes.name?.value,
        id: tagXml.attributes.id?.value,
      }

      return tag
    },
    orderTags(){
      let orderedTags = {}
      //orderedTags.metadata = this.postTags.filter((tag) => tag.type == 2)
      orderedTags.Copyright = this.postsTags.filter((tag) => tag.type == 3)
      orderedTags.Character = this.postsTags.filter((tag) => tag.type == 4)
      orderedTags.Artist = this.postsTags.filter((tag) => tag.type == 1)
      orderedTags.General = this.postsTags.filter((tag) => tag.type == 0)
      this.postsTags = orderedTags
      console.log('postTags',this.postsTags);
    },
    sendToPost(post){
      this.$router.push(`/post/${post.id}`)
    },
    navBarSearch(tags){
      console.log(tags);
      this.$router.push(`/browse/${tags}`)
      this.getPostByTags(tags)
    }
  },
}
</script>

<style lang="scss">
@import '../assets/styles/browseView.scss';
</style>
