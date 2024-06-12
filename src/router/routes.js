import BrowseView from '../views/BrowseView.vue'
import LandingView from '../views/LandingView.vue'


const routes = [
  {
    path: '/browse',
    name:'Browser',
    component: BrowseView
    
  },
  { 
    path: '/', 
    component: LandingView,
    name:'Landing',
    props: {
      showNavBar: false
    }
  },
]

export default routes