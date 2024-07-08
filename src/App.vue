<template>
  <NavBar v-if="showNav"></NavBar>
  <RouterView @updateNav="navChange($event)"></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
import { useNavBarStore } from './Store/navBarStore';
import { defineAsyncComponent } from 'vue';
const NavBar = defineAsyncComponent({
  loader: () => import('./components/NavBar.vue')
})
export default{
  data() {
    return {
      showNav: false,
      counterImgs: 'https://safebooru.org/counter/${number(0-9)}.gif',
      postInfo:`https://safebooru.org/index.php?page=dapi&s=post&q=index&id=5023936&json=1`,
      singleImgUrlImgSource: 'https://safebooru.org//(if(sample == true)samples - if(sample == false)images )/${directory}/sample_${image}?${id}',
      sampleRequestUrlList: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=1&limit=10&json=1',
      sampleRequestUrlPost: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&id=4991637&json=1',
      sampleRequestUrlPostComments: 'https://safebooru.org/index.php?page=dapi&s=comment&q=index&post_id=4959145',
      postAmount: 4788688,
      getPostWithThisTags: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=0&limit=100&tags=1girl&json=1',
      autocompleteLinkForSearchInput: 'https://safebooru.org/autocomplete.php?q=${input}',
      forTags: 'https://safebooru.org/index.php?page=dapi&s=tag&q=index&name=1girl',
      forMultipleTags: 'https://safebooru.org/index.php?page=post&s=list&tags=1girl+glasses',
      getTagInfoAndType: 'https://safebooru.org/index.php?page=dapi&s=tag&q=index&pid=0&name=animated',
      searchByUserUploads: 'https://safebooru.org/index.php?page=post&s=list&tags=user:Danbooru',

      cardsImgs:[
        {
          searchCard: 'https://pixabay.com/illustrations/magnifying-glass-glass-search-4186151/',
          searchHover: 'https://www.freepik.com/premium-ai-image/anime-girl-with-pink-hair-horns-holding-magnifying-glass-generative-ai_83959271.htm'

        },
      ]
    }
  },
  components:{
    NavBar
  },
  methods:{
    navChange(state){
      if(state){
        this.showNav = true
        useNavBarStore().showNavBar = true
      }else{
        this.showNav = useNavBarStore().showNavBar
      }
    }
  },
  
  
}
</script>

<style lang="scss">
@import './assets/styles/_globalStyles.scss'
</style>
