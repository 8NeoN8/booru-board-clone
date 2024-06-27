<template>
  <div class="statList">
    <div class="stats-title">
      Statistics
    </div>

    <div class="stats-content">
      
      

    </div>

  </div>
</template>

<script>
export default{
  name:'StatList',
  data() {
    return {
      test: 'Statistics'
    }
  },
  props:{
    stats:{
      type: Object,
      default: {
        
      },
    }
  }
}
</script>

<style>
@import '../assets/styles/statList.scss'
</style>