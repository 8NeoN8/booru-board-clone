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
      postAmount: 4788688,
      landingPageCardImg: 'https://www.freepik.com/premium-ai-image/anime-girl-with-pink-hair-horns-holding-magnifying-glass-generative-ai_83959271.htm'
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


