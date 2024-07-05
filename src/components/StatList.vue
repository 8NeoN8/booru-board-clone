<template>
  <div class="statList">
    <div class="stats-title">
      Statistics
    </div>

    <ul class="stats-content">
      
      <template v-for="(stat, key) in stats" :key="key">
        <li v-if="key != 'source' && key != 'by'" class="stat-element">
          {{ key }}: {{ stat }}
        </li>
        <li v-if="key == 'source'" class="stat-element">
          {{ key }}: <a target="_blank" :href="'https://'+stat" class="uploader-or-source-link">{{ stat }}</a>
        </li>
        <li v-if="key == 'by'" class="stat-element" @click="this.$emit('clickedUploader', `user:${stat}`)">
          {{ key }}: <span class="uploader-stat"> {{ stat }} </span>
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
  emits:['clickedUploader'],
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