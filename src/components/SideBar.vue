<template>
  <div class="side-bar">
    <SearchBar @sendSearch="this.$emit('sendSearch',$event)"></SearchBar>
    <TagList :tagListObj="tags" @ClickedTag="this.$emit('ClickedTag',$event)"></TagList>
    <StatList :stats="stats" @clickedUploader="this.$emit('clickedUploader',$event)"></StatList>

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
  }
}
</script>

<style>
</style>