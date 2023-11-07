import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import Dashboard from './components/Dashboard.vue'
import Layout from './components/Layout.vue'
import router from './router'
import '@progress/kendo-theme-default/dist/all.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
const app = createApp(App)

//
app.use(Vue3Toastify, {
    autoClose: 9000,
  } as ToastContainerOptions)
  app.component('DefaultLayout', Dashboard)
app.component('Layout',Layout)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
