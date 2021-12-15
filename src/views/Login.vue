<template>
	<v-container>
		<v-card
			class="secondary px-8 py-4 mx-auto"
			max-width="300"
			elevation="5"
		>
			<v-card-title class="my-2">Login</v-card-title>
			<v-divider class="mb-4"></v-divider>
			<v-text-field label="Username"></v-text-field>
			<v-text-field label="Password" :type="'password'"></v-text-field>
			<v-card-actions>
				<v-btn text class="accent float-right" elevation="3"
					>Send</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "Login",
});
</script>