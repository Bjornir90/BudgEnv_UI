<template>
	<v-container>
		<v-card
			class="secondary px-8 py-4 mx-auto"
			max-width="300"
			elevation="5"
		>
			<v-card-title class="my-2">Login</v-card-title>
			<v-divider class="mb-4"></v-divider>
			<v-text-field label="Username" v-model="username"></v-text-field>
			<v-text-field
				label="Password"
				v-model="password"
				:type="'password'"
			></v-text-field>
			<v-card-actions>
				<v-btn
					text
					class="accent float-right"
					elevation="3"
					@click="login"
					>Send</v-btn
				>
			</v-card-actions>
			<v-alert type="success" v-if="loginSuccess"
				>Login successful</v-alert
			>
			<v-alert type="error" v-if="loginFail">{{ loginMessage }}</v-alert>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "Login",
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
				.post(`${process.env.VUE_APP_API_URL}/token`, {
					password: this.password,
					username: this.username,
				})
				.then(
					(response) => {
						const token = response.data.token;
						this.$store.commit("setToken", token);
						this.loginSuccess = true;
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
