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
      showNav: false
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
