<template>
  <div class="container flex flex-column justify-between x-hidden">
    <div class="upper-side landing-img-container w-100 text-center">
      <img class="landing-img" src="https://safebooru.org/includes/header.png">
    </div>

    <div class="lower-side flex h-50 w-100 justify-between align-center">

      <div class="lower-left w-100 h-100 ph-1">

        <div class="cards-title fs-2 text-center pt-1">
          Quickly go to one of our pages!
        </div>

        <div class="option-cards h-70 test-bg-red flex justify-center align-center">

          <div class="card flex justify-center">
            <span class="test-bg-cyan fsh-2 w-100 text-center card-text">
              Browse Posts
            </span>
          </div>

          <div class="card flex justify-center">
            <span class="test-bg-cyan fsh-2 w-100 text-center card-text">
              All Comments
            </span>
          </div>
          <div class="card flex justify-center">
            <span class="test-bg-cyan fsh-2 w-100 text-center card-text">
              My Account
            </span>
          </div>
          <div class="card flex justify-center">
            <span class="test-bg-cyan fsh-2 w-100 text-center card-text">
              The Forum
            </span>
          </div>
        </div>

      </div>

      <div class="divider"></div>

      <div class="lower-right w-100 h-100 p-1 ">

        <div class="search-title fs-2 text-center">
          ...Or look for something specific!
        </div>

        <div class="search-fields">

          <div class="search-input-container flex justify-center align-center flex-column p-1 test-bg-red">
            <label for="search-input" class="fsh-2">This is a Tag based search!</label>
            <input type="text" name="search-input" id="search-input" class="search-input w-75 ph-1">
          </div>

          <div class="search-buttons test-bg-blue flex justify-around">

            <button class="search-button">
              Search this Tags
            </button>

            <button class="random-buttom">
              Get a Random Post!
            </button>

          </div>

          <div class="serving-post text-center test-bg-white w-100 fsh-2 flex flex-column justify-center">

            <div class="deco-underline text-center">
              Currently Serving:
            </div>
    
    
            <div class="counter flex w-100  justify-center">
              <template v-for="(img, index) in 10" :key="index">
                <img :src="`https://safebooru.org/counter/${index}.gif`">
              </template>
            </div>
    
            <div class="deco-underline">
              4,784,947 posts!
            </div>
    
            <small class="gelbooru-version">
              Running Gelbooru Beta 0.2.0
            </small>
    
          </div>

        </div>
      </div>

    </div>

    <footer class="landing-footer h-5 flex align-center justify-center text-center fs-1">
      Total number of visitors so far: 1 billion gizillion <b>|</b><!-- 36,521,292 -->
      Original concept by Danbooru. <b>|</b>
      Clone design by AGDevs
    </footer>

    <!-- <div class="search-and-options flex flex-column w-100 test-bg-red text-center align-center x-hidden">
      <div class="options flex justify-center test-bg-blue">
        <template v-for="(link, index) in links" :key="index">
          <div class="landing-link" @click="send(link)">
            {{link}}
          </div>
        </template>
      </div>
      <div class="search-bar-container test-bg-yellow w-100">
        <input class="search-bar" type="text">
      </div>
      <div class="button-container w-100 test-bg-purple">
        <button class="search-button w-15 ">Search</button>

      </div>
    </div>

    <div class="counter-and-details flex flex-column w-100 test-bg-gray align-center x-hidden">

      <div class="serving-post text-center test-bg-white w-100 fsh-2 flex flex-column justify-center">

        <div class="deco-underline text-center">
          Currently Serving:
        </div>


        <div class="counter flex w-100  justify-center">
          <template v-for="(img, index) in 10" :key="index">
            <img :src="`https://safebooru.org/counter/${index}.gif`">
          </template>
        </div>

        <div class="deco-underline">
          4,784,947 posts!
        </div>

        <small class="gelbooru-version">
          Running Gelbooru Beta 0.2.0
        </small>

      </div>
    </div>

    <div class="bottom-side flex flex-column test-bg-lime">
      <div class="details text-center">
        Total number of visitors so far: 36,505,467
        <br>
        Original concept by Danbooru
      </div>
    </div> -->

  </div>
</template>

<script>

export default{
  name: 'LandingView',
  data() {
    return {
      debug: 'debug',
      links:['Browse', 'Comments', 'My Account', 'Forum'],
      postCount: 4788688
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
@import '../assets/styles/_landingView.scss'
</style>
