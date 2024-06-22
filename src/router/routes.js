import BrowseView from '../views/BrowseView.vue'
import LandingView from '../views/LandingView.vue'
import PostView from '../views/PostView.vue'


const routes = [
  { 
    path: '/', 
    component: LandingView,
    name:'Landing',
  },
  {
    path: '/browse',
    name:'Browser',
    component: BrowseView    
  },
  { 
    path: '/comments', 
    component: LandingView,
    name:'Comments',
  },
  { 
    path: '/account', 
    component: LandingView,
    name:'Account',
  },
  { 
    path: '/forum', 
    component: LandingView,
    name:'Forum',
  },
  { 
    path: '/post/:postId', 
    component: PostView,
    name:'Post',
    props: true
  },
]

export default routes