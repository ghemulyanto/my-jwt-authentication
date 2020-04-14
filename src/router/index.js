import Vue from "vue";
import Router from "vue-router";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Profile from "@/components/Profile";
import Home from "@/components/Home";
import BoardUser from "@/components/BoardUser";
import BoardAdmin from "@/components/BoardAdmin";
import BoardModerator from "@/components/BoardModerator";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: Home,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    {
      path: "/user",
      name: "BoardUser",
      component: BoardUser,
    },
    {
      path: "/admin",
      name: "BoardAdmin",
      component: BoardAdmin,
    },
    {
      path: "/moderator",
      name: "BoardModerator",
      component: BoardModerator,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

export default router;
