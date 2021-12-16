<template>
  <v-container>
    <v-alert type="error" v-if="transactionsLoadFailed">{{
      failMessage
    }}</v-alert>
    <v-data-table
      :headers="headers"
      :items="displayTransactions"
      :items-per-page="15">
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>Transactions</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="accent" @click="dialog = true">New transaction</v-btn>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="500">
          <v-card class="primary">
            <v-toolbar class="secondary">
              <v-toolbar-title>Create new transaction</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false" rounded
                ><mdicon name="close"
              /></v-btn>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="newTransaction.payee"
                label="Payee"
                :rules="[rules.required]"></v-text-field>
              <v-text-field
                v-model="newTransaction.memo"
                label="Memo"></v-text-field>
              <v-text-field
                v-model="newTransaction.amount"
                label="Amount (cents)"
                :rules="[rules.required]"></v-text-field>

              <v-menu v-model="dateMenu" :close-on-content-click="false">
                <v-text-field
                  readonly
                  v-model="newTransaction.date"
                  @focus="dateMenu = true"
                  :rules="[rules.required]"></v-text-field>
                <v-date-picker
                  v-model="newTransaction.date"
                  @input="dateMenu = false"></v-date-picker>
              </v-menu>

              <v-select
                :items="categoryNames"
                label="Category"
                v-model="newTransaction.categoryName"></v-select>
              <v-alert type="error" v-if="invalidCategory"
                >Category is not valid</v-alert
              >
            </v-card-text>
            <v-card-actions>
              <v-btn @click="submitNewTransaction" color="accent">Create</v-btn>
            </v-card-actions>
            <v-alert type="error" v-if="failCreate"
              >Could not create transaction</v-alert
            >
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Category, Transaction } from "../common";

type TransactionDisplay = {
  payee: string;
  date: string;
  memo: string;
  amount: number;
  categoryName: string;
};

export default Vue.extend({
  name: "Transactions",

  computed: {
    getCategoryFromName() {
      return (name: string) =>
        (this.categories as Category[]).find(
          (category) => category.name === name
        );
    },
    displayTransactions(): TransactionDisplay[] {
      return this.transactions.map((transaction) => {
        const categoryName = (this.categories as Category[]).find(
          (category) => category.id === transaction.categoryId
        )?.name;
        return {
          payee: transaction.payee,
          date: transaction.date,
          memo: transaction.memo,
          amount: transaction.amount,
          categoryName: categoryName || "Missing category name",
        };
      }, this);
    },
    ...mapState(["categories", "token"]),
  },

  data: () => {
    return {
      transactions: [] as Transaction[],
      categoryNames: [] as string[],
      transactionsLoadFailed: false,
      dateMenu: false,
      newTransaction: {
        amount: 0, // Amount in cents
        memo: "",
        payee: "",
        categoryName: "",
        date: new Date().toISOString().split("T")[0],
      },
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
          text: "Memo",
          value: "memo",
        },
        {
          text: "Amount",
          value: "amount",
        },
        {
          text: "Category",
          value: "categoryName",
        },
      ],
      failMessage: "",
      dialog: false,
      rules: {
        required: (value: any) => !!value || "Required",
      },
      invalidCategory: false,
      failCreate: false,
    };
  },

  mounted: function () {
    const currentDay = new Date();
    let aMonthAgo = new Date();
    aMonthAgo.setDate(currentDay.getDate() - 30);

    this.categoryNames = (this.categories as Category[]).map(
      (value) => value.name
    );

    this.$http
      .get(`${process.env.VUE_APP_API_URL}/transactions/range`, {
        params: {
          start_date: aMonthAgo.toISOString().split("T")[0],
          end_date: currentDay.toISOString().split("T")[0],
        },
      })
      .then(
        (response) => {
          this.transactions = response.data;
        },
        (err) => {
          this.transactionsLoadFailed = true;
          this.failMessage = err.data.message;
          console.log(err);
        }
      );
  },

  methods: {
    submitNewTransaction: function () {
      this.invalidCategory = false;
      this.failCreate = false;
      const category = this.getCategoryFromName(
        this.newTransaction.categoryName
      );

      if (category === undefined) {
        this.invalidCategory = true;
        return;
      }

      let transaction: Transaction = {
        amount: this.newTransaction.amount,
        date: this.newTransaction.date,
        payee: this.newTransaction.payee,
        memo: this.newTransaction.memo,
        categoryId: category.id,
      };
      this.$http
        .post(`${process.env.VUE_APP_API_URL}/transactions`, transaction)
        .then(
          (value) => {
            this.dialog = false;
            this.transactions.push(value.data);
          },
          (err) => {
            this.failCreate = true;
          }
        );
    },
  },
});
</script>
