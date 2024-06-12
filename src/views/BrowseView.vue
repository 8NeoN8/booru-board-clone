<template>
  <div class="container">
    ola browse
  </div>
</template>

<script>
export default{
  name: 'BrowseView',
  data() {
    return {
      debug: 'debug'
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
