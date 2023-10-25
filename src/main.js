import { createApp } from 'vue';
import router from './router'
import mitt from 'mitt';

import App from './App.vue';


import './assets/css/ayoflex.css';
import './assets/css/example.css';

const eventBus = mitt();

const app = createApp(App);
app.use(router);
app.config.globalProperties.$eventBus =  eventBus;
app.mount('#app');
