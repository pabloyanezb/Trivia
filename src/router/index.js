import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

import Auth from "../components/Auth";
import Home from "../components/Home";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: Auth,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

// firebase.auth().onAuthStateChanged((user) => {
//   console.log("On Auth State Changed");
//   if (!user) {
//     console.log("No existe usuario. Redireccionando a login");
//     router.replace("/login");
//   } else {
//     console.log("Sesión iniciada -> " + user.email);
//   }
// });

// router.beforeEach((to, from, next) => {
//   let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

//   firebase.auth().onAuthStateChanged((user) => {
//     if (requiresAuth && !user) {
//       console.log(
//         "Requiere Auth, pero no hay usuario. Redireccionando a login."
//       );
//       next("/login");
//     } else {
//       next();
//     }
//   });
// });
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let userLoggedIn = to.matched.some(record => record.meta.requiresAuth);

  if (userLoggedIn && !currentUser) {
    next('/login')
  }
  else next ()
})

export default router;
