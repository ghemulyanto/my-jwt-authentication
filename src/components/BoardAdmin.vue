<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "AdminBoard",
  data: () => ({
    content: ""
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/signin");
    }
    if (this.currentUser && !this.currentUser.roles.includes("ROLE_ADMIN")) {
      this.$router.push("/");
    } else {
      UserService.getAdminBoard().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>