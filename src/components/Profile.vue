<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title>
            <v-icon large left>mdi-account-circle</v-icon>
            <span class="title font-weight-light">Profile</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="currentUser.username" label="Username" readonly />
              <v-text-field v-model="token" label="Token" name="token" readonly />
              <v-text-field v-model="currentUser.id" label="Id" name="id" readonly />
              <v-text-field v-model="currentUser.email" label="Email" name="email" readonly />
              <v-text-field
                v-model="currentUser.roles"
                label="Authorities"
                name="authorities"
                readonly
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "profile",
  data: () => ({
    token: ""
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      this.token =
        this.currentUser.accessToken.substring(0, 20) +
        "..." +
        this.currentUser.accessToken.substring(
          this.currentUser.accessToken.lenth - 20
        );
    }
  }
};
</script>