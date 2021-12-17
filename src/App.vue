<template>
  <v-app>
    <v-app-bar app class="primary">
      <v-btn text to="/transactions"
        ><mdicon name="format-list-bulleted" class="mr-2" />Transactions</v-btn
      >

      <v-spacer></v-spacer>

      <v-btn text to="/"
        ><mdicon name="folder-open" class="mr-2" />BudgEnv</v-btn
      >

      <v-spacer></v-spacer>

      <v-btn text to="/login" v-if="!isLoggedIn"
        ><mdicon name="login" class="mr-2" />Login</v-btn
      >
      <v-btn text v-else @click="logOut"
        ><mdicon name="logout" class="mr-2" />Log out</v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Category, MonthlyAffectation } from "./common";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  }),

  computed: {
    isLoggedIn() {
      return this.$cookies.isKey("budgenvtoken");
    },
    ...mapState(["categories", "monthlyAffectations"]),
  },

  methods: {
    logOut() {
      this.$cookies.remove("budgenvtoken");
      this.$router.push("/login");
    },
  },

  updated: function () {
    if ((this.categories as Category[]).length === 0) {
      this.$http.get(`${process.env.VUE_APP_API_URL}/budgets/default`).then(
        (response) => {
          this.$store.commit("setCategories", response.data.categories);
        },
        (err) => {
          console.log(err.data);
        }
      );
    }

    if ((this.monthlyAffectations as MonthlyAffectation[]).length === 0) {
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}/affectations/month/${new Date()
            .toISOString()
            .substring(0, 7)}` //Retrieve only the month from the date
        )
        .then(
          (response) => {
            this.$store.commit("setMonthlyAffectations", response.data);
          },
          (err) => {
            console.log(err.data);
          }
        );
    }
  },
});
</script>
