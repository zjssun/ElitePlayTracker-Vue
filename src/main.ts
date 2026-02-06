import './assets/css/app.css'
import './assets/css/header.css'
import './assets/css/home.css'
import './assets/css/match.css'
import './assets/css/matchCard.css'
import './assets/css/matchDate.css'
import './assets/css/mtachArea.css'
import './assets/css/notice.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n/index'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
