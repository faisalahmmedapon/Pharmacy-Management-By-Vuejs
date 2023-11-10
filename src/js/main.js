
// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue';
import router from '../router'

import App from '../App.vue';

const app = createApp(App);
app.use(router);
// app.config.globalProperties.$eventBus =  eventBus;
app.mount('#app');
