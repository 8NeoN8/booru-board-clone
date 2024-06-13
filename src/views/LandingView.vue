<template>
  <div class="container flex flex-column justify-between x-hidden">
    <div class="landing-img-container p-1 w-100 h-50 text-center x-hidden">
      <img class="landing-img w-100" src="https://safebooru.org/includes/header.png">
    </div>

    <div class="search-and-options flex flex-column w-100 test-bg-red text-center align-center x-hidden">
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

        <div>
          Running Gelbooru Beta 0.2.0
        </div>

      </div>
    </div>

    <div class="bottom-side flex flex-column test-bg-lime">
      <div class="details text-center">
        Total number of visitors so far: 36,505,467
        <br>
        Original concept by Danbooru
      </div>
    </div>

  </div>
</template>

<script>

export default{
  name: 'LandingView',
  data() {
    return {
      debug: 'debug',
      links:['Browse', 'Comments', 'My Account', 'Forum']
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
