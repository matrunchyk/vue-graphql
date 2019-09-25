import BaseModel from '../models/BaseModel';

const VueGraphqlModels = {
  install(Vue, opts = {}) {
    BaseModel.options = opts;
    BaseModel.vue = Vue;
  }
};

export default VueGraphqlModels;
