<template>
  <div class="container flex flex-column justify-between x-hidden">

    <div class="top-section landing-img-container">
      <img class="landing-img" src="https://safebooru.org/includes/header.png">
    </div>

    <div class="middle-section">
      <div class="middle-section-cards ph-1">

        <div class="cards-title fs-2 text-center">
          Quickly go to one of our pages
        </div>

        <div class="option-cards">

          <div class="card">
            <RouterLink class="card-link" to="browse"> 
              <span class="card-text">
                Browse
              </span>
            </RouterLink>
          </div>
          <div class="card">
            <RouterLink class="card-link" to="comments"> 
              <span class="card-text">
                Comments
              </span>
            </RouterLink>
          </div>

          <div class="divider"></div>

          <div class="card">
            <RouterLink class="card-link" to="account"> 
              <span class="card-text">
                My Account
              </span>
            </RouterLink>
          </div>
          <div class="card">
            <RouterLink class="card-link" to="forum"> 
              <span class="card-text">
                The Forum
              </span>
            </RouterLink>
          </div>


        </div>

      </div>

      <div class="middle-section-search">
        
        <div class="search-title fs-2 text-center">
          ...Or look for something specific!
        </div>

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
            Currently Serving:
          </div>

          <div class="posts-counter flex w-100  justify-center">
            <template v-for="(gif, index) in NumberGifs" :key="index">
              <img :src="`https://safebooru.org/counter/${gif}.gif`" class="post-gif">
            </template>
          </div>
  
          <div class="posts-number">
            {{ postCount }} posts!
          </div>
  
          <small class="gelbooru-version">
            Running Gelbooru Beta 0.2.0
          </small>
          
        </div>

      </div>

      
    </div>
    
    <footer class="bottom-section footer-section">
      <p class="footer-text">
        Total number of visitors so far: 1 billion gizillion 
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
      debug: 'debug',
      links:['Browse', 'Comments', 'My Account', 'Forum'],
      postCount: 4728638,
      NumberGifs: [4,7,2,8,6,3,8],
      searchTerms:'',
      corsProxy: 'https://corsproxy.io/?',
      autocomplete: [],
      showAutocomplete: true,
      lastQueueAmount: 0,
      searchQueue: [],
      fetching: false,
      delayedFetch: false,
    }
  },
  emits:['updateNav'],
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
      this.lastQueueAmount = this.searchQueue.length
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
      let randomPostId = parseInt(Math.random() * this.postCount);
      return randomPostId
    },
    sendSearch(){

    },
  },
  mounted() {

    

  },
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/landingView.scss';
</style>
