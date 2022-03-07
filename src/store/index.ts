import { mdiOfficeBuildingMarkerOutline } from "@mdi/js";
import Vue from "vue";
import Vuex from "vuex";
import { Category, MonthlyAffectation, Budget } from "../common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [] as Category[],
    monthlyAffectations: [] as MonthlyAffectation[],
    currentBudget: {
      unaffectedAmount: 0,
      key: "",
      name: ""
    },
    budgets: [] as Budget[]
  },
  mutations: {
    setCategories(state, categories: Category[]) {
      state.categories = categories;
    },
    setMonthlyAffectations(state, affectations: MonthlyAffectation[]) {
      state.monthlyAffectations = affectations;
    },
    setCurrentBudget(state, budget: Budget){
      state.currentBudget = budget;
    },
    setBudgets(state, budgets: Budget[]) {
      state.budgets = budgets;
    }
  },
  actions: {},
  modules: {},
});
