import Vue from "vue";
import Vuex from "vuex";
import { Category, MonthlyAffectation } from "../common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [] as Category[],
    monthlyAffectations: [] as MonthlyAffectation[],
  },
  mutations: {},
  actions: {},
  modules: {},
});
