import BaseModel from '../models/BaseModel';
import Field from '../models/Forms/Field';
import MenuItem from '../models/Menu/repository/MenuItem';

const VueGraphqlModels = {
  install(Vue, options = {}) {
    Object.assign(BaseModel.prototype, options.baseModel || {});
    Object.assign(Field.prototype, options.field || {});
    Object.assign(MenuItem.prototype, options.menuItem || {});

    if (options.dataLoader) {
      Object.assign(Field.prototype, options.dataLoader);
    }

    if (options.modelLoader) {
      Object.assign(Field.prototype, options.modelLoader);
    }

    if (options.gqlLoader) {
      Object.assign(BaseModel.prototype, options.gqlLoader);
    }

    Vue.mixin({
      created() {
        if (!Vue.prototype.$pluginInstalled) {
          console.info(`VGM Installed successfully. Version: ${BaseModel.version}`);

          Object.assign(BaseModel.prototype, { vue: this });
          Object.assign(MenuItem.prototype, { vue: this });
          Object.assign(Field.prototype, { vue: this });

          Object.assign(Vue.prototype, { $pluginInstalled: true });
        }
      }
    });
  }
};

export default VueGraphqlModels;
