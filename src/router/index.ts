import { createRouter, createWebHistory } from "vue-router";
import About from "../views/About.vue";
import Track from "../views/Track.vue";
import FeedbackForm from '@/components/FeedbackForm.vue';

const routes = [
  { path: "/", redirect: "/track" }, // Redirect root to /track
  { path: "/track", component: Track },
  { path: "/about", component: About },
  { path: '/feedback', component: FeedbackForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;