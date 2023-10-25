import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
// import Drugs from '../views/Dashboard/Drugs.vue';
// import Overview from '../views/Dashboard/Overview.vue';
// import SellingHistory from '../views/Dashboard/SellingHistory.vue';
// import Settings from '../views/Dashboard/Settings.vue';

//import Vendors from '../views/Dashboard/Vendors.vue';

// if you want to just import this page // when page content will be more and more and need to more time to reload then you should use just single page import by click;
const Drugs = () => import("../views/Dashboard/Drugs.vue");
const Overview = () => import("../views/Dashboard/Overview.vue");
const SellingHistory = () => import("../views/Dashboard/SellingHistory.vue");
const Settings = () => import("../views/Dashboard/Settings.vue");
const Vendors = () => import("../views/Dashboard/Vendors.vue");

const routes = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      {
        path: "drugs",
        component: Drugs,
      },
      {
        path: "overview",
        component: Overview,
      },
      {
        path: "selling-history",
        component: SellingHistory,
      },
      {
        path: "settings",
        component: Settings,
      },
      {
        path: "vendors",
        component: Vendors,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
