<template>
  <div class="tagList">
    <div class="list-title">
      Tags
    </div>

    <div class="list-content">
      <div class="list-section" v-for="(section, key) in tagListObj" :key="key">
        <template v-if="section.length > 0">
          <div class="section-title">
            {{ key }}
          </div>
          <div :class="`section-tags ${key}-tags`">
            <div class="list-tag" v-for="(tag, index) in section" :key="index" @click="sendTagBrowse()">
              <span class="tag-name">
                {{ tag.name }}
              </span>
              <span class="tag-count">
                {{ tag.count }}
              </span>
            </div>
          </div>
        </template>
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
    },
    methods:{
    },
  }
}
</script>

<style>
@import '../assets/styles/tagList.scss'
</style>
