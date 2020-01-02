<template>
  <v-app id="application">
    <v-app-bar app color="indigo" dark class="hidden-xs-and-down">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
        The Application
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path" :title="item.desc">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {
    menuItems() {
      return [
        {title: 'Sign Up', path: '/signup', icon: 'mdi-clipboard-text', desc:'Member Registration'},
        {title: 'Sign In', path: '/signin', icon: 'mdi-login', desc:"Login to Application"},
      ]
    }
  }
}
</script>