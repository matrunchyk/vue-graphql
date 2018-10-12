export default class Config {
  vue;
  vuex;
  apollo;
  gqlImporter = () => {};
  dataImporter = () => {};
  modelImporter = () => {};
  viewImporter = () => {};

  constructor(vue = {
    $route: {
      fullPath: 'unconfigured',
    },
  }) {
    this.vue = vue;
    this.vuex = vue.$store || {
      getters: [],
      dispatch: () => {},
    };
    this.apollo = vue.$apollo || {
      mutate: () => Promise.reject('Unconfigured'),
      query: () => Promise.reject('Unconfigured')
    };
  }
}
