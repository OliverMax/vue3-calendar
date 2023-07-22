import { createApp } from 'vue'
import { clickOutside } from '@/directives'

import App from './App.vue'
import '@/styles/scss/main.scss'

createApp(App)
  .directive('click-outside', clickOutside)
  .mount('#app')
