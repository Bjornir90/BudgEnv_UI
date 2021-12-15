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
			return this.token !== "";
		},
		...mapState(["token"]),
	},
});
</script>
