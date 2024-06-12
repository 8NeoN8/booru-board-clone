import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes'

import { useNavBarStore } from '../Store/navBarStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  let navState = useNavBarStore()
  if(from.path == '/') {
    navState.show()
  }
  if(to.path == '/'){
    navState.hide()
  }
  next()
})

export default router