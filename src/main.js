import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import guard from './router/guard';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/styles/reset.css';
import './assets/styles/index.css';
import './components/ThemeToggler/index.scss';

const pinia = createPinia();
const app = createApp(App);

guard(router);

app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount('#app');