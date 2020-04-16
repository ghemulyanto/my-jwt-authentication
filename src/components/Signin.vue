<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{
      message
      }}
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs12 class="text-sm-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="handleLogin">
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="user.username"
                :error-messages="usernameErrors"
                label="Username"
                required
                @input="$v.user.username.$touch()"
                @blur="$v.user.username.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="user.password"
                :error-messages="passwordErrors"
                label="Password"
                type="password"
                required
                @input="$v.user.password.$touch()"
                @blur="$v.user.password.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex class="text-sm-right" mt-5>
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import User from "../models/user";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "login",
  mixins: [validationMixin],
  validations: {
    user: {
      username: { required },
      password: { required }
    }
  },
  data() {
    return {
      user: new User("", ""),
      loading: false,
      snackbar: false,
      snackbarColor: "",
      message: ""
    };
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.user.username.$dirty) return errors;
      !this.$v.user.username.required && errors.push("Is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required && errors.push("Is required");
      return errors;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
      } else {
        this.loading = true;
        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            error => {
              this.loading = false;
              if (error.status === 401) {
                this.message =
                  "Your username or password is incorrect. Please try again!";
              } else {
                this.message = error.message;
              }

              this.snackbar = true;
              this.snackbarColor = "error";
            }
          );
        }
      }
    }
  }
};
</script>