<template>
	<v-container>
		<v-alert type="error" v-if="transactionsLoadFailed">{{
			failMessage
		}}</v-alert>
		<v-data-table
			:headers="headers"
			:items="transactions"
			:items-per-page="15">
			<template v-slot:top>
				<v-toolbar>
					<v-toolbar-title>Transactions</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn class="accent" @click="dialog = true"
						>New transaction</v-btn
					>
				</v-toolbar>
				<v-dialog v-model="dialog">
					<v-card>
						<v-card-title>Create new transaction</v-card-title>
						<v-card-text>
							<v-text-field
								v-model="newTransaction.payee"
								label="Payee"></v-text-field>
							<v-text-field
								v-model="newTransaction.memo"
								label="Memo"></v-text-field>
							<v-text-field
								v-model="newTransaction.amount"
								label="Amount (cents)"></v-text-field>

							<v-select
								:items="categoryNames"
								label="Category"></v-select>
						</v-card-text>
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

export default Vue.extend({
	name: "Transactions",

	computed: {
		...mapState(["categories", "token"]),
	},

	data: () => {
		return {
			transactions: [] as Transaction[],
			categoryNames: [] as string[],
			transactionsLoadFailed: false,
			newTransaction: {
				amount: 0, // Amount in cents
				memo: "",
				payee: "",
				categoryId: "",
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
			],
			failMessage: "",
			dialog: false,
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
				headers: { Authorization: `Bearer ${this.token}` },
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

	methods: {},
});
</script>
