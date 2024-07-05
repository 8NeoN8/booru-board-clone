<template>
  <div class="container">
    ola browse 
    <br>
    {{ tags }}
  </div>
</template>

<script>
export default{
  name: 'BrowseView',
  data() {
    return {
      debug: 'debug',
      searchUrl: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=1girl',
    }
  },
  props:{
    tags:{
      type: String
    }
  },
  emits:['updateNav'],
  mounted() {
    this.$emit('updateNav')
  },
}
</script>

<style lang="scss">
  
</style>
