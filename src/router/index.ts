import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/jobs/results",
    name: "jobResultsView",
    component: () =>
      import(/*webpackChunkName: "jobs"*/ "@/views/JobResultsView.vue"),
  },
  {
    path: "/jobs/results/:id",
    name: "jobView",
    component: () => import(/*webpackChunkName: "jobs"*/ "@/views/JobView.vue"),
  },
  {
    path: "/teams",
    name: "teamsView",
    component: () => import("@/views/TeamsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
