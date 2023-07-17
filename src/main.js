import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from './store'

loadFonts()

createApp(App).use(router).use(store).mount('#app')
