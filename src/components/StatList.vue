<template>
  <div class="statList">
    <div class="stats-title">
      Statistics
    </div>

    <ul class="stats-content">
      
      <template v-for="(stat, key) in stats" :key="key">
        <li v-if="key != 'by' && key != 'source'" class="stat-element">
          {{ key }}: {{ stat }}
        </li>
        <li v-if="key == 'by' || key == 'source'" class="stat-element">
          {{ key }}: <a target="_blank" :href="'https://'+stat" class="uploader-or-source-link">{{ stat }}</a>
        </li>
      </template>

    </ul>

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