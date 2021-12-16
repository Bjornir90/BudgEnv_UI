import Vue from "vue";
import Vuex from "vuex";
import { Category, MonthlyAffectation } from "../common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [] as Category[],
    monthlyAffectations: [] as MonthlyAffectation[],
    token: "",
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setCategories(state, categories: Category[]) {
      state.categories = categories;
    },
    setMonthlyAffectations(state, affectations: MonthlyAffectation[]) {
      state.monthlyAffectations = affectations;
    },
  },
  actions: {},
  modules: {},
});
