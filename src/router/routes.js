const routes = [
  { 
    path: '/', 
    component: () => import('../views/LandingView.vue'),
    name:'Landing',
  },
  {
    path: '/browse',
    name:'Browser',
    component: () => import('../views/BrowseView.vue')    
  },
  {
    path: '/browse/:tags',
    name:'BrowserTags',
    component: () => import('../views/BrowseView.vue'),
    props:true,
  },
  { 
    path: '/comments', 
    component: () => import('../views/LandingView.vue'),
    name:'Comments',
  },
  { 
    path: '/account', 
    component: () => import('../views/LandingView.vue'),
    name:'Account',
  },
  { 
    path: '/forum', 
    component: () => import('../views/LandingView.vue'),
    name:'Forum',
  },
  { 
    path: '/post', 
    component: () => import('../views/PostView.vue'),
    name:'Post',
  },
  { 
    path: '/post/:postId', 
    component: () => import('../views/PostView.vue'),
    name:'PostFull',
    props: true
  },
]

export default routes