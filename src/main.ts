import { createApp } from 'vue';
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from "./router";

import App from './App.vue';

const app = createApp(App); // Create the Vue application instance
app.use(router); // Use the router plugin
app.mount('#app'); // Mount the app to the DOM