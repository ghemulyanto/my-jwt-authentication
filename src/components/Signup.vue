<template>
  <v-container class="fill-height" fluid>
    <v-snackbar v-model="snackbar" :color="snackbarColor">
      {{
      message
      }}
    </v-snackbar>
    <v-row justify="center" align="center">
      <v-card max-width="800" class="elevation-11 mx-auto" color="grey lighten-5">
        <v-card-title>
          <v-icon large left>mdi-account-circle</v-icon>
          <span class="title font-weight-light">Sign Up</span>
        </v-card-title>
        <v-row justify="center">
          <v-col cols="12" md="24">
            <v-form v-model="valid" @submit.prevent="handleRegister">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4" sm="8">
                    <v-text-field
                      label="Username"
                      class="purple-input"
                      v-model="user.username"
                      :counter="20"
                      :error-messages="usernameErrors"
                      required
                      @input="$v.user.username.$touch()"
                      @blur="$v.user.username.$touch()"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      label="Email Address"
                      class="purple-input"
                      v-model="user.email"
                      required
                      :counter="50"
                      :error-messages="emailErrors"
                      @input="$v.user.email.$touch()"
                      @blur="$v.user.email.$touch()"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      label="Password"
                      class="purple-input"
                      type="password"
                      v-model="user.password"
                      hint="At least 8 characters"
                      required
                      :counter="40"
                      @input="$v.user.password.$touch()"
                      @blur="$v.user.password.$touch()"
                      :error-messages="passwordErrors"
                    />
                  </v-col>
                  <v-col v-if="adminRole" cols="12" md="4">
                    <v-select
                      :items="roles"
                      label="Choose Role"
                      item-text="name"
                      item-value="name"
                      v-model="user.role"
                      bottom
                      autocomplete
                      dense
                      multiple
                    ></v-select>
                  </v-col>

                  <v-col cols="12" class="text-sm-right">
                    <v-btn color="primary" type="submit">SIGN UP</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import User from "../models/user";
import MasterService from "../services/master.service";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";

export default {
  name: "signup",
  mixins: [validationMixin],
  validations: {
    user: {
      username: { required, maxLength: maxLength(20), minLength: minLength(3) },
      email: { required, maxLength: maxLength(50), email },
      password: { required, maxLength: maxLength(40), minLength: minLength(8) }
    }
  },
  data: () => ({
    valid: false,
    user: new User("", "", "", ""),
    message: "",
    successful: false,
    snackbar: false,
    snackbarColor: "",
    roles: null
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    adminRole() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.user.username.$dirty) return errors;
      !this.$v.user.username.maxLength &&
        errors.push("Maximum 20 characters long");
      !this.$v.user.username.minLength &&
        errors.push("Minimum 3 characters long");
      !this.$v.user.username.required && errors.push("Is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.maxLength &&
        errors.push("Maximum 50 characters long");
      !this.$v.user.email.required && errors.push("Is required");
      !this.$v.user.email.email && errors.push("Not valid");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.maxLength &&
        errors.push("Maximum 40 characters long");
      !this.$v.user.password.minLength &&
        errors.push("Minimum 8 characters long");
      !this.$v.user.password.required && errors.push("Is required");
      return errors;
    }
  },
  mounted() {
    if (this.adminRole) {
      MasterService.getRoles().then(
        response => {
          this.roles = response.data;
        },
        error => {
          this.roles =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  },
  methods: {
    handleRegister() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("auth/register", this.user).then(
          data => {
            this.message = data.message;
            this.successful = true;
            this.$v.$reset();
            this.user = new User("", "", "", "");
            this.snackbar = true;
            this.snackbarColor = "info";
          },
          error => {
            this.message = error.message;
            this.successful = false;
            this.snackbar = true;
            this.snackbarColor = "error";
          }
        );
      }
    }
  }
};
</script>
