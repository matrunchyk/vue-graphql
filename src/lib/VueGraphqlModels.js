import BaseModel from '../models/BaseModel';

const VueGraphqlModels = {
  install(Vue, $vgmOptions = {}) {
    Object.assign(Vue.prototype, {
      $vgmOptions,
    });

    Vue.mixin({
      created() {
        if (!Vue.prototype.$pluginInstalled) {
          Object.assign(BaseModel.prototype, { vue: this });
          Object.assign(Vue.prototype, { $pluginInstalled: true });
        }
      }
    });
  }
};

export default VueGraphqlModels;
