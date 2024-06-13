<template>
  <NavBar v-if="showNav"></NavBar>
  <RouterView @updateNav="navChange()"></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
import { useNavBarStore } from './Store/navBarStore';
export default{
  data() {
    return {
      showNav: false,
      counterImgs: 'https://safebooru.org/counter/${number(0-9)}.gif',
      singleImgUrl: 'https://safebooru.org//(if(sample == true)samples - if(sample == false)images )/${directory}/sample_${image}?${id}',
      sampleRequestUrlList: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&pid=1&limit=10&json=1',
      sampleRequestUrlPost: 'https://safebooru.org/index.php?page=dapi&s=post&q=index&id=4991637&json=1',
      sampleRequestUrlPostComments: 'https://safebooru.org/index.php?page=dapi&s=comment&q=index&post_id=4959145',
    }
  },
  methods:{
    navChange(){
      this.showNav = useNavBarStore().showNavBar
    }
  },
  
  
}
</script>

<style lang="scss">
@import './assets/styles/_globalStyles.scss'
</style>
