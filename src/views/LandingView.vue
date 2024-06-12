<template>
  <div class="container">
    <div class="landing-img-container">
      <img class="landing-img" src="https://safebooru.org/includes/header.png">
    </div>
  </div>
</template>

<script>

export default{
  name: 'LandingView',
  data() {
    return {
      debug: 'debug',
    }
  },
  emits:['updateNav'],
  methods: {
    send(){
      this.$router.push('/browse')
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
