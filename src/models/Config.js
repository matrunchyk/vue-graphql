export default class Config {
  graphqlPath = 'Gql';
  dataPath = 'Data';
  modelsPath = 'Models';
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
}
