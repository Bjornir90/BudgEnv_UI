<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="categories"
      class="elevation-1"
      show-expand>

      <template #item.amount="{ item }">
        <v-chip class="primary">
          {{ makeAmountPrintable(item.amount) }}
        </v-chip>
      </template>

      <template #item.affected="{ item }">
        <v-chip class="primary">
          {{ makeAmountPrintable(computeAffectedAmount(item)) }}
        </v-chip>
      </template>

      <template #item.name="{item}">
        <v-edit-dialog
          :return-value.sync="item.name">
          {{ item.name }}
          <template #input>
            <v-text-field
              v-model="item.name"
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
import { Category, GoalType, MonthlyAffectation, Transaction } from "../common";

export default Vue.extend({
  name: "HomePage",

  computed: {
      ...mapState(["categories", "monthlyAffectations"]),
  },

  data: () => {
      return {
          headers: [
              {
                text: "Category",
                value: "name"
              },
              {
                text: "Amount available",
                value: "amount"
              },
              {
                text: "Amount affected",
                value: "affected"
              },
              { 
                text: '', 
                value: 'data-table-expand' 
              }
          ],
      }
  },

  methods:{
    computeAffectedAmount: function (category: Category): number {
      if(this.monthlyAffectations.length === 0){
        return 0;
      }
      let affectationsForCategory = (this.monthlyAffectations as MonthlyAffectation[]).filter((monthlyAffectation) => monthlyAffectation.affectation.categoryId === category.key);
      return affectationsForCategory.map((value) => value.affectation.amount).reduce((previousValue, currentValue) => previousValue + currentValue);
    }
  }
});
</script>
