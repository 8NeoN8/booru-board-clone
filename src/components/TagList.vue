<template>
  <div class="tagList">
    <div class="list-title">
      TAGS
    </div>

    <div class="list-content">
      
      <div class="list-section" v-for="(section, key) in tagListObj" :key="key">
        <div class="section-title">
          {{ key }}
        </div>
        <div class="list-tag" v-for="(tag, index) in section" :key="index">
          {{ tag.name }} - {{ tag.count }}
        </div>
      </div>

    </div>

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
    tagListObj:{
      type: Object,
      default: {
        copyright:['pokemon'],
        character:['bellelba_(pokemon)', 'lillie_(pokemon)'],
        artist:['kinocopro'],
        general:['2girls','black_hair','blonde_hair'],
      },
    }
  }
}
</script>

<style>
@import '../assets/styles/tagList.scss'
</style>
