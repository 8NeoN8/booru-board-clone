<template>
  <div class="NavBar">
    <div class="web-title">Safebooru</div>
    <ul class="nav-routes">
      <template v-for="(link, index) in navRoutes" :key="index">
        <li v-if="!link.isExternal" class="nav-link" @click="sendTo(link.route)">
          {{ link.name }}
        </li>

        <li v-if="link.isExternal" class="nav-link">
          <a class="nav-external-link" :href="link.route">
            {{ link.name }}
          </a>
        </li>
      </template>
    </ul>
    myaccount
    browse
    forum
    twitter
    about
    patreon
  </div>
</template>

<script>
export default{
  name:'NavBar',
  data() {
    return {
      navRoutes:[
        {
          name: 'My Account',
          route: '/account',
          isExternal: false
        },
        {
          name: 'Browse',
          route: '/browse',
          isExternal: false
        },
        {
          name: 'Forum',
          route: '/forum',
          isExternal: false
        },
        {
          name: 'About',
          route: '/about',
          isExternal: false
        },
        {
          name: 'Twitter/X',
          route: 'https://twitter.com/safebooru/',
          isExternal: true
        },
        {
          name: 'Patreon',
          route: 'https://patreon.com/booru',
          isExternal: true
        }
      ]
    }
  },
}
</script>

<style>
@import '../assets/styles/navBar.scss'
</style>
