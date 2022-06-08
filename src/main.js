import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faChevronRight, faChevronLeft, faXmark)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Croppa)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
