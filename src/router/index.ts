import { createRouter, createWebHashHistory } from "vue-router";

//路由数组
const routes = [
  {
    path: "/",
    redirect: "/game",
  },
  {
    path: "/game",
    name: "game",
    component: () => import("../views/Game/Game.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/stage",
    name: "stage",
    component: () => import("../views/Stage/Stage.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../views/Map/Map.vue"),
    meta: {
      keepAlive: true,
    },
  },
];

//路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes, //上面的路由数组
});

//导出路由对象，在main.js中引用
export default router;
