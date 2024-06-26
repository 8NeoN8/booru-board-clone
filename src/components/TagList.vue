<template>
  <div class="tagList">
  </div>
</template>

<script>
export default{
  name:'TagList',
  data() {
    return {
      test: 'tags'
    }
  },
  props:{
    tagListArr:{
      type: Array,
      default: [],
    }
  }
}
</script>

<style>
</style>
