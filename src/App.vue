<template>
  <v-app>
    <v-app-bar app class="primary">
      <v-btn text to="/transactions">Transactions</v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/">BudgEnv</v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="/login" v-if="!isLoggedIn"
        ><mdicon name="lock" />Login</v-btn
      >
      <v-btn text v-else @click="logOut">Log out</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

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
    logOut () {
      this.$cookies.remove("budgenvtoken");
      this.$router.push("/login");
    }
  },

  updated: function () {
    this.$http.get(`${process.env.VUE_APP_API_URL}/budgets/default`).then(
      (response) => {
        this.$store.commit("setCategories", response.data.categories);
      },
      (err) => {
        console.log(err.data);
      }
    );
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
  },
});
</script>
