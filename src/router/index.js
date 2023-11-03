import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";

const LoginView = () => import("../views/Auth/LoginView.vue");
const RegisterView = () => import("../views/Auth/RegisterView.vue");
const ProfileView = () => import("../views/Auth/ProfileView.vue");
const OrderHistory = () => import("../views/Auth/OrderHistory.vue");
const Settings = () => import("../views/Auth/Settings.vue");

const routes = [
  {
    path: "/",
    component: IndexView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/profile",
    component: ProfileView,
    children: [
      {
        path: "order-history",
        component: OrderHistory,
      },
      {
        path: "settings",
        component: Settings,
        children: [
          {
            path: "account",
            component: Settings,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
