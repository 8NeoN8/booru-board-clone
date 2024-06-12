import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { createPinia } from 'pinia'
import NavBar from './components/NavBar.vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('NavBar', NavBar)

app.mount('#app')
