<template>
  <v-container>
    <v-data-table :headers="headers" :items="transactions" :items-per-page="15">
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Category, Transaction } from "../common";

export default Vue.extend({
  name: "Transactions",

  computed: {
    ...mapState(["categories", "token"]),
  },

  data: () => {
    return {
      transactions: [] as Transaction[],
      transactionsLoadFailed: false,
      headers: [
        {
          text: "Payee",
          value: "payee",
        },
        {
          text: "Date",
          value: "date",
        },
        {
          text: "Note",
          value: "memo",
        },
        {
          text: "Amount",
          value: "amount",
        },
      ],
    };
  },

  mounted: function () {
    const currentDay = new Date();
    let aMonthAgo = new Date();
    aMonthAgo.setDate(currentDay.getDate() - 30);

    this.$http
      .get(`${process.env.VUE_APP_API_URL}/transactions/range`, {
        params: {
          start_date: aMonthAgo.toISOString().split("T")[0],
          end_date: currentDay.toISOString().split("T")[0],
        },
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then(
        (response) => {
          this.transactions = response.data;
        },
        (err) => {
          this.transactionsLoadFailed = true;
          console.log(err);
        }
      );
  },

  methods: {},
});
</script>