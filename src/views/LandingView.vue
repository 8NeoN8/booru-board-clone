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

          <input type="text" name="search-input" id="search-input" class="search-input" placeholder="E.x. +glasses +short_hair -black_hair">
          
        </div>

        <div class="search-buttons">

          <button class="search-button s-button">
            Search this Tags
          </button>

          <button class="random-buttom s-button">
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
    }
  },
  emits:['updateNav'],
  methods: {
    send(pathName){
      this.$router.push(pathName)
    }
  },
  mounted() {
    this.$emit('updateNav')
  },
}
</script>

<style lang="scss">
@import '../assets/styles/_variables.scss';
@import '../assets/styles/landingView.scss';
</style>
