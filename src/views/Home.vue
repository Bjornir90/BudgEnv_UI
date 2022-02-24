<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="categories"
      class="elevation-1" show-expand>
      <!--<template #item.amount="{ item }">
        <v-chip class="primary">
          {{ item.amount }}
        </v-chip>
      </template>-->

      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>


    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Category, GoalType, Transaction } from "../common";

export default Vue.extend({
  name: "HomePage",

  computed: {
      ...mapState(["categories"])
  },

  data: () => {
      return {
          headers: [
              {
                text: "Category",
                value: "name"
              },
              {
                text: "Amount stored",
                value: "amount"
              },
              { 
                text: '', 
                value: 'data-table-expand' 
              }
          ]
      }
  }
});
</script>
