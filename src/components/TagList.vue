<template>
  <div class="tagList">
    <div class="list-title">
      TAGS
    </div>

    <div class="list-content">
      
      <div class="list-section" v-for="(section, key) in tagListArr" :key="key">
        <div class="section-title">
          {{ key }}
        </div>
        <div class="list-tag" v-for="(tag, index) in section" :key="index">
          {{ tag }}
        </div>
      </div>
      <!-- <div class="section-title">
        Artist
      </div>
      <div class="list-tag" v-for="(tag, index) in tagListArr.artist" :key="index">
        {{ tag }}
      </div>
      <div class="section-title">
        Character
      </div>
      <div class="list-tag" v-for="(tag, index) in tagListArr.character" :key="index">
        {{ tag }}
      </div>
      <div class="section-title">
        General
      </div>
      <div class="list-tag" v-for="(tag, index) in tagListArr.general" :key="index">
        {{ tag }}
      </div> -->

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
    tagListArr:{
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
