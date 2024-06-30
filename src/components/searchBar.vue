<template>
  <div class="searchBar">

    <input type="text" name="tag-search-bar" id="tag-search-bar" @input="getAcItems()" @keydown.prevent.esc="sendSearchAndBrowse()">

    <div v-if="showAC && AutoCompleteList.length > 0" @mouseout="showAC = false" class="autocomplete-list" id="autocomplete-list">
      <template v-for="(item, index) in AutoCompleteList" :key="index">
        <div tabindex="0" class="autocomplete-item" @click="insertSelectedTag(item.value, this.searchTerms)" @keyup.enter="insertSelectedTag(item.value, this.searchTerms)">
          {{ item.label }} <br>
        </div>
      </template>

    </div>

    <button class="search-button">
      search
    </button>

  </div>
</template>

<script>
export default{
  name:'TagList',
  data() {
    return {
      test: 'searchBar',
      showAC: false,
      AutoCompleteList: []
    }
  },
  methods: {
    getAcItems(){

    },
    sendSearchAndBrowse(){

    },
    insertSelectedTag(){

    },
  },
}
</script>

<style>
@import '../assets/styles/searchBar.scss'
</style>
