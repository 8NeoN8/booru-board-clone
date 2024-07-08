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
    path: '/browse/:tags',
    name:'BrowserTags',
    component: BrowseView,
    props:true,
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
    path: '/post', 
    component: PostView,
    name:'Post',
  },
  { 
    path: '/post/:postId', 
    component: PostView,
    name:'PostFull',
    props: true
  },
]

export default routes