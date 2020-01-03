<template>
  <v-content>
    <v-container>
      <v-row justify="center" align="center">
        <v-card max-width="800" class="elevation-11 mx-auto" color="grey lighten-5">
          <v-card-title>
            <v-icon large left>mdi-account-circle</v-icon>
            <span class="title font-weight-light">Sign Up</span>
          </v-card-title>
          <v-row justify="center">
            <v-col cols="12" md="24">
              <v-form v-model="valid">
                <v-container class="py-0">
                  <v-row>
                    <v-col cols="12" md="4" sm="8">
                      <v-text-field
                        label="Username"
                        class="purple-input"
                        v-model="username"
                        :rules="usernameRules"
                        :counter="20"
                        required
                      />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        label="Email Address"
                        class="purple-input"
                        v-model="email"
                        :rules="emailRules"
                        required
                      />
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        label="Password"
                        class="purple-input"
                        type="password"
                        v-model="password"
                        :rules="passwordRules"
                        hint="At least 8 characters"
                        required
                      />
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
  </v-content>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    username: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => v.length <= 20 || "Username must be less than 20 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+/.test(v) || "Email must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 8 || "Minimum password is 8 characters"
    ]
  })
};
</script>
