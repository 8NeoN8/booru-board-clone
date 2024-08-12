<template>
  <div class="landing-container flex flex-column justify-between x-hidden">

    <div class="top-section landing-img-container">
      <img class="landing-img" src="https://safebooru.org/includes/header.png">
    </div>

    <div class="middle-section">

      <div class="links-container">
        <template v-for="(link, index) in links" :key="index">  
          <RouterLink class="card-link" :to="link.toLowerCase()">
            {{ link }}
          </RouterLink>
        </template>
      </div>

      <div class="middle-section-search">

        <div class="search-bar-section pt-1">

          <label for="search-input" class="search-input-label">This is a Tag based search</label>

          <input v-model="searchTerms" @input="getAutocomplete()" @keyup.prevent.esc="showAutocomplete = false" type="text" name="search-input" id="search-input" class="search-input" placeholder="E.x. glasses short_hair -black_hair">

          <div v-if="showAutocomplete && autocomplete.length > 0" @mouseout="showAutocomplete = false" class="autocomplete" id="autocomplete">
            <template v-for="(item, index) in autocomplete" :key="index">
              <div tabindex="0" class="autocomplete-option" @click="insertSelectedTag(item.value, this.searchTerms)" @keyup.enter="insertSelectedTag(item.value, this.searchTerms)">
                {{ item.label }} <br>
              </div>
            </template>

          </div>
          
        </div>

        <div class="search-buttons">

          <button class="search-button s-button" @click="sendSearch()">
            Search these Tags
          </button>

          <button class="random-buttom s-button" @click="randomPost()">
            Random Post!
          </button>

        </div>

        <div class="posts-gifs">

          <div class="posts-top-text">
            Currently Serving: {{ numberOfPosts }} posts!
          </div>

          <div class="posts-counter flex w-100  justify-center">
            <template v-for="(gif, index) in NumberGifs" :key="index">
              <img :src="`https://safebooru.org/counter/${gif}.gif`" class="post-gif">
            </template>
          </div>
  
          <small class="gelbooru-version">
            (NOT HERE) Running Gelbooru Beta 0.2.0
          </small>
          
        </div>

      </div>

    </div>
    
    <footer class="bottom-section footer-section">
      <p class="footer-text">
        Total number of visitors so far: {{ numberOfVisitors }}
        <br> <!-- 36,521,292 -->
        Original concept by Danbooru. Clone design by AGDevs
      </p>
    </footer>

  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default{
  name: 'LandingView',
  components:{
    RouterLink
  },
  data() {
    return {
      links:['Browse', 'Comments', 'Account', 'Forum'],
      NumberGifs: null,
      searchTerms:'',
      corsProxy: 'https://corsproxy.io/?',
      autocomplete: [],
      showAutocomplete: true,
      lastQueueAmount: 0,
      searchQueue: [],
      fetching: false,
      numberOfPosts: null,
      numberOfVisitors: null,
    }
  },
  methods: {
    test(){
      console.log('this is test');
    },
    send(pathName){
      this.$router.push(pathName)
    },
    async getAutocomplete(){
      let queryData = null
      if(this.searchTerms == '') return

      if(this.searchTerms.length > 0){
        queryData = this.searchTerms
      }

      if(queryData.includes(' ')){
        queryData = queryData.split(' ').pop()
      }
      
      if(queryData.split('').pop() == ' '|| queryData.split('').pop() == null) return

      this.searchQueue.push(queryData)

      if(!this.fetching){
        this.fetching = true
        setTimeout(() => {
          this.autocompleteFetch()
          this.fetching = false
          console.log(this.fetching);
        }, 1500);
        
      }
    },
    async autocompleteFetch(){
      this.showAutocomplete = false
      let param = this.searchQueue.pop()
      let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/autocomplete.php?q=${param}`)
      const req = await fetch(reqUrl)
      if(req){
        this.autocomplete = await req.json()
        this.showAutocomplete = true
      }
    },
    insertSelectedTag(tag,search){
      let poppedSearch = null 
      poppedSearch = search
      if(search.includes(' ')){
        poppedSearch = search.split(' ').pop()
      } 

      //console.log('search>>: ',search, '\n', 'poppedSearch>>:', poppedSearch,'\n', 'tag>>: ', tag);

      this.searchTerms = this.searchTerms.replace(poppedSearch, tag)

      this.showAutocomplete = false

      this.focusSearch()
    },
    focusSearch(){
      let se = document.getElementById('search-input')
      se.focus()
    },
    randomPost(){
      let postId = this.randomId()
      this.$router.push(`/post/${postId}`)
    },
    randomId(){
      let randomPostId = parseInt(Math.random() * this.numberOfPosts);
      return randomPostId
    },
    sendSearch(){
    },
    async getLandingPage(){
      let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org`)
      const req = await fetch(reqUrl)
      if(req){
        let res = await req.text()
      
        let parser = new DOMParser()
        let html = parser.parseFromString(res, "text/html")
        
        this.getNumberOfPosts(html)
        this.getNumberOfVisitors(html)
      }
    },
    getNumberOfPosts(html){
      const body = html.getElementById('static-index')
      const paragraph = Array.from(body.getElementsByTagName('p'))[0]
      let posts = paragraph.innerText
      posts = posts.split('-')[0].split(' ')[1].split(',').join('')
      this.numberOfPosts = posts
      this.NumberGifs = posts.split('')
    },
    getNumberOfVisitors(html){
      let visitors = Array.from(html.getElementsByTagName('small'))[0].innerText

      visitors = visitors.split(':')[1].replace(' ', '')

      this.numberOfVisitors = visitors
    }
  },
  mounted() {

    this.getLandingPage()

  },
}
</script>

<style lang="scss">
@import '../assets/styles/landingView.scss';
</style>
