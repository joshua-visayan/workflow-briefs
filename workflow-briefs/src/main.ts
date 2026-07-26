import './assets/css/main.css'

import { createApp } from "vue";
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import ui from "@nuxt/ui/vue-plugin";
import WorkflowDetailsView from './components/WorkflowDetailsView.vue';
import WorkflowsView from './components/WorkflowsView.vue';

const pinia = createPinia();
const app = createApp(App);

const routes = [
  {
    path: "/",
    name: "home",
    component: WorkflowsView,
  },
  {
    path: "/details/:id",
    name: "details",
    component: WorkflowDetailsView,
  }
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

app.use(router);
app.use(ui);
app.use(pinia);
app.mount("#app");
