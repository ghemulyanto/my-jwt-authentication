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
  name: "User",
  data() {
    return {
      content: ""
    };
  },
  computed: {
    curentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.curentUser) {
      this.$router.push("/signin");
    } else {
      UserService.getUserBoard().then(
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