<template>
  <v-container>
    <v-card
      class="secondary px-8 py-4 mx-auto"
      max-width="300"
      elevation="5">
      <v-card-title class="my-2">
        Login
      </v-card-title>
      <v-divider class="mb-4" />
      <v-text-field
        v-model="username"
        label="Username" />
      <v-text-field
        v-model="password"
        label="Password"
        :type="'password'"
        @keyup.enter="login" />
      <v-card-actions>
        <v-btn
          text
          class="accent float-right"
          elevation="3"
          @click="login">
          Send
        </v-btn>
      </v-card-actions>
      <v-alert
        v-if="loginSuccess"
        type="success">
        Login successful
      </v-alert>
      <v-alert
        v-if="loginFail"
        type="error">
        {{ loginMessage }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "../common";
export default Vue.extend({
  name: "LoginPortal",
  data: () => {
    return {
      username: "",
      password: "",
      loginMessage: "",
      loginFail: false,
      loginSuccess: false,
    };
  },

  methods: {
    login: function () {
      this.loginFail = false;
      this.loginSuccess = false;
      this.$http
        .post(`${process.env.VUE_APP_API_URL}/tokens`, {
          password: this.password,
          username: this.username,
        })
        .then(
          (response) => {
            const token = response.data.token;
            this.$cookies.set(
              "budgenvtoken",
              token,
              60 * 60 * 24 * 7 //One week
            );
            this.$http.get(`${process.env.VUE_APP_API_URL}/users/${this.username}`).then(res => {
              this.$http.get(`${process.env.VUE_APP_API_URL}/budgets/${(res.data as User).defaultBudgetKey}`).then(resBudget => {
                this.$store.commit("setCurrentBudget", resBudget.data);
                this.loginSuccess = true;
                setTimeout(() => this.$router.push({ name: "/" }), 500);
              }, errBudget => {
                this.loginMessage = errBudget.data.message;
                this.loginFail = true;
              });
            }, err => {
              this.loginMessage = err.data.message;
              this.loginFail = true;
            });
          },
          (err) => {
            this.loginMessage = err.data.message;
            this.loginFail = true;
          }
        );
    },
  },
});
</script>
