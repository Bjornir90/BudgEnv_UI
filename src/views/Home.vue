<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="categories"
      class="elevation-1"
      show-expand>
      <!--<template #item.amount="{ item }">
        <v-chip class="primary">
          {{ item.amount }}
        </v-chip>
      </template>-->

      <template #item.amount="props">
        {{ makeAmountPrintable(props.item.amount) }}
      </template>

      <template #item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name">
          {{ props.item.name }}
          <template #input>
            <v-text-field
              v-model="props.item.name"
              label="Edit name"
              single-line />
          </template>
        </v-edit-dialog>
      </template>

      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-text-field
            v-model="item.note"
            label="Edit memo"
            single-line />
        </td>
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
