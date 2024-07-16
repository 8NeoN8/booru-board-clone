<template>
  <div class="side-bar">
    <SearchBar @sendSearch="this.$emit('sendSearch',$event)"></SearchBar>
    <TagList v-if="tags" :tagListObj="tags" @ClickedTag="this.$emit('ClickedTag',$event)"></TagList>
    <StatList v-if="stats" :stats="stats" @clickedUploader="this.$emit('clickedUploader',$event)"></StatList>
    <div class="view-original-button-container">
      <button v-if="showOGButton" class="view-original-button" @click="this.$emit('changeToOriginal')">View Original</button>
    </div>
  </div>
</template>

<script>

import { defineAsyncComponent } from 'vue';

const TagList = defineAsyncComponent({
  loader: () => import('./TagList.vue')
})
const StatList = defineAsyncComponent({
  loader: () => import('./StatList.vue')
})
const SearchBar = defineAsyncComponent({
  loader: () => import('./SearchBar.vue')
})

export default{
  name:'SideBar',
  data() {
    return {
      test: 'SideBar'
    }
  },
  components:{
    TagList,
    StatList,
    SearchBar
  },
  props:{
    tags:{
      type: Object
    },
    stats:{
      type: Object
    },
    showOGButton:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>