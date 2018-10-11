export default class Config {
  vue = {
    $route: {
      fullPath: 'unconfigured',
    },
  };
  vuex = {
    getters: [],
    dispatch: () => {},
  };
  apollo = {
    mutate: () => Promise.reject('Unconfigured'),
    query: () => Promise.reject('Unconfigured')
  };
  gqlImporter = () => {};
  dataImporter = () => {};
  modelImporter = () => {};
  viewImporter = () => {};
}
