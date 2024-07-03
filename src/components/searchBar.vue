<template>
  <div class="searchBar">
    <div class="search-bar-title">
      Search Something:
    </div>
    <div class="search-bar-input-and-autocomplete">
      <input 
        type="text" 
        name="tag-search-bar" 
        id="tag-search-bar" 
        class="tag-search-bar" 
        @input="getAcItems()" 
        @keyup.prevent.enter="sendSearchAndBrowse()"
        @keyup.prevent.esc="showAC = false"
        @focus="AutoCompleteList.length > 0 ? showAC = true : null"
        v-model="searchTerms"
      >

      <div class="autocomplete-container" v-if="showAC">
        <template v-for="(item, index) in AutoCompleteList" :key="index">
          <div 
            class="AC-item" 
            tabindex="0"
            @keyup.prevent.enter="insertSelectedTag(item.value,searchTerms); showAC = false"
            @click="insertSelectedTag(item.value,searchTerms); showAC = false"
          >
            <span class="AC-label">
              {{ item.value }}
            </span>
            <span class="AC-amount">
              {{ item.label_amount }}
            </span>
          </div>
        </template>
      </div>
    </div>

    <button class="search-button" @focus="showAC = false" @click="sendSearchAndBrowse()" @keyup.prevent.enter="sendSearchAndBrowse()">
      Search
    </button>

  </div>
</template>

<script>
export default{
  name:'SearchBar',
  data() {
    return {
      test: 'searchBar',
      showAC: false,
      AutoCompleteList: [],
      searchTerms: '',
      fetching: false,
      searchQueue: [],
    }
  },
  methods: {
    async getAcItems(){
      let queryData = null
      if(this.searchTerms == '') return

      if(this.searchTerms.length > 0){
        queryData = this.searchTerms
      }

      if(queryData.includes(' ')){
        queryData = queryData.split(' ').pop()
      }
      
      if(queryData.split('').pop() == ' '|| queryData.split('').pop() == null) return

      this.searchQueue.push(queryData)

      if(!this.fetching){
        this.fetching = true
        setTimeout(() => {
          this.autocompleteFetch()
          this.fetching = false
        }, 1500);
        
      }
    },
    async autocompleteFetch(){
      this.showAutocomplete = false
      let param = this.searchQueue.pop()
      let reqUrl = 'https://corsproxy.io/?' + encodeURIComponent(`https://safebooru.org/autocomplete.php?q=${param}`)
      const req = await fetch(reqUrl)
      if(req){
        this.AutoCompleteList = await req.json()
        this.AutoCompleteList = this.AutoCompleteList.map(result => {
          result = {
            ...result,
            label_amount: result.label.split(' ')[1].slice(1, -1)
          } 
          return result
        })
        this.showAC = true
      }
    },
    sendSearchAndBrowse(){

    },
    insertSelectedTag(tag,search){
      this.showAC = false

      let poppedSearch = null 
      poppedSearch = search
      if(search.includes(' ')){
        poppedSearch = search.split(' ').pop()
      } 

      this.searchTerms = this.searchTerms.replace(poppedSearch, tag)

      this.showAC = false

      let searchBar = document.getElementById('tag-search-bar')
      searchBar.focus()
    },
  },
}
</script>

<style>
@import '../assets/styles/searchBar.scss'
</style>
