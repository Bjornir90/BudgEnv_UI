import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: colors.blueGrey.darken4,
                secondary: colors.blueGrey.darken3,
                accent: colors.blue.accent3,
            },
            light: {
                primary: colors.teal.lighten3,
                secondary: colors.amber.lighten4,
                accent: colors.lightBlue.lighten1,
            }
        }
    }
});
