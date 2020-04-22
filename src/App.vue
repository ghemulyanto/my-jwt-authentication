<template>
  <v-app id="application">
    <v-app-bar app clipped-left color="indigo" dark class="hidden-xs-and-down">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="currentUser" />
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">The Application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" v-if="currentUser">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          :title="item.desc"
          :v-on:click="item.method"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn text key="Sign Out" title="User Sign Out" to="/signout" @click="logOut">
          <v-icon left>mdi-logout</v-icon>Sign Out
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-xs-only" v-if="!currentUser">
        <v-btn text key="Sign Up" title="User Registration" to="/signup">Sign Up</v-btn>
        <v-btn text key="Sign In" title="User Sign In" to="/signin">Sign In</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped color="grey-lighten-4">
      <v-list dense v-if="showAdminOnlyBoard">
        <v-list-item
          v-for="adminItem in adminItems"
          :key="adminItem.title"
          :to="adminItem.path"
          :title="adminItem.desc"
          link
        >
          <v-list-item-icon class="indigo--label">
            <v-icon color="indigo">{{ adminItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="indigo--text">{{ adminItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense v-if="showAdminModeratorBoard">
        <v-list-item
          v-for="adminModeratorItem in adminModeratorItems"
          :key="adminModeratorItem.title"
          :to="adminModeratorItem.path"
          :title="adminModeratorItem.desc"
          link
        >
          <v-list-item-icon class="indigo--label">
            <v-icon color="indigo">{{ adminModeratorItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="indigo--text">{{ adminModeratorItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense v-if="showModeratorOnlyBoard">
        <v-list-item
          v-for="moderatorItem in moderatorItems"
          :key="moderatorItem.title"
          :to="moderatorItem.path"
          :title="moderatorItem.desc"
          link
        >
          <v-list-item-icon class="indigo--label">
            <v-icon color="indigo">{{ moderatorItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="indigo--text">{{ moderatorItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense v-if="showUserOnlyBoard">
        <v-list-item
          v-for="userItem in userItems"
          :key="userItem.title"
          :to="userItem.path"
          :title="userItem.desc"
          link
        >
          <v-list-item-icon class="indigo--label">
            <v-icon color="indigo">{{ userItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="indigo--text">{{ userItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import {
  INACTIVE_USER_TIME_THRESHOLD,
  USER_ACTIVITY_THROTTLER_TIME
} from "@/constants/constant";

export default {
  name: "App",
  data: () => ({
    isInactive: false,
    userActivityThrottlerTimeout: null,
    userActivityTimeout: null,
    drawer: false,
    adminItems: [
      {
        title: "Admin Board",
        path: "/admin",
        icon: "mdi-clipboard-account",
        desc: "Admin Dashboard"
      },
      {
        title: "Add User",
        path: "/signup",
        icon: "mdi-account-plus",
        desc: "Add New User"
      },
      {
        title: "User Board",
        path: "/user",
        icon: "mdi-clipboard-account",
        desc: "User Dashboard"
      },
      { title: "About", path: "/about", icon: "mdi-information" }
    ],
    adminModeratorItems: [
      {
        title: "Admin Board",
        path: "/admin",
        icon: "mdi-clipboard-account",
        desc: "Admin Dashboard"
      },
      {
        title: "Moderator Board",
        path: "/moderator",
        icon: "mdi-clipboard-account",
        desc: "Moderator Dashboard"
      },
      {
        title: "Add User",
        path: "/signup",
        icon: "mdi-account-plus",
        desc: "Add New User"
      },
      {
        title: "User Board",
        path: "/user",
        icon: "mdi-clipboard-account",
        desc: "User Dashboard"
      },
      { title: "About", path: "/about", icon: "mdi-information" }
    ],
    moderatorItems: [
      {
        title: "Moderator Board",
        path: "/moderator",
        icon: "mdi-clipboard-account",
        desc: "Moderator Dashboard"
      },
      {
        title: "User Board",
        path: "/user",
        icon: "mdi-clipboard-account",
        desc: "User Dashboard"
      },
      { title: "About", path: "/about", icon: "mdi-information" }
    ],

    userItems: [
      {
        title: "User Board",
        path: "/user",
        icon: "mdi-clipboard-account",
        desc: "User Dashboard"
      },
      { title: "About", path: "/about", icon: "mdi-information" }
    ]
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminOnlyBoard() {
      if (this.currentUser && this.currentUser.roles.includes("ROLE_ADMIN")) {
        return !this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    },
    showAdminModeratorBoard() {
      if (this.currentUser && this.currentUser.roles.includes("ROLE_ADMIN")) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    },
    showModeratorOnlyBoard() {
      if (
        this.currentUser &&
        this.currentUser.roles.includes("ROLE_MODERATOR")
      ) {
        return !this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showUserOnlyBoard() {
      return (
        !this.showAdminOnlyBoard &&
        !this.showAdminModeratorBoard &&
        !this.showModeratorOnlyBoard
      );
    },
    menuItems() {
      return [
        {
          title: this.currentUser.username,
          path: "/profile",
          icon: "mdi-account",
          desc: "User Profile"
        }
      ];
    }
  },
  methods: {
    logOut() {
      this.drawer = false;
      this.$store.dispatch("auth/logout");
      this.$router.push("/signin");
    },

    activateActivitiyTracker() {
      window.addEventListener("mousemove", this.userActivityThrottler);
      window.addEventListener("scroll", this.userActivityThrottler);
      window.addEventListener("keydown", this.userActivityThrottler);
      window.addEventListener("resize", this.userActivityThrottler);
    },
    deactivateActivityTracker() {
      window.removeEventListener("mousemove", this.userActivityThrottler);
      window.removeEventListener("scroll", this.userActivityThrottler);
      window.removeEventListener("keydown", this.userActivityThrottler);
      window.removeEventListener("resize", this.userActivityThrottler);
    },
    resetUserActivityTimeout() {
      clearTimeout(this.userActivityTimeout);
      this.userActivityTimeout = setTimeout(() => {
        this.userActivityThrottler();
        this.inactiveUserAction();
      }, INACTIVE_USER_TIME_THRESHOLD);
    },
    userActivityThrottler() {
      if (this.isInactive) {
        this.isInactive = false;
      }
      if (!this.userActivityThrottlerTimeout) {
        this.userActivityThrottlerTimeout = setTimeout(() => {
          this.resetUserActivityTimeout();
          clearTimeout(this.userActivityThrottlerTimeout);
          this.userActivityThrottlerTimeout = null;
        }, USER_ACTIVITY_THROTTLER_TIME);
      }
    },
    inactiveUserAction() {
      this.isInactive = true;
      this.logOut();
    }
  },
  beforeMount() {
    this.activateActivitiyTracker();
  },
  beforeDestroy() {
    this.deactivateActivityTracker();
    clearTimeout(this.userActivityTimeout);
    clearTimeout(this.userActivityThrottlerTimeout);
  }
};
</script>