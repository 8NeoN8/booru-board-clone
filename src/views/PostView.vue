<template>
  <div class="container">
    <img :src="`https://safebooru.org//samples/4619/sample_3afeefcd1d3fc85491fa81cf0677c35b65eb1f66.jpg?5014701`" alt="">
    {{ postId }}
  </div>
</template>

<script>
export default{
  name: 'PostView',
  data() {
    return {
      debug: 'debug'
    }
  },
  props:{
    postId:{
      type: String
    }
  }
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
