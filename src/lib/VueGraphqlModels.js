import BaseModel from '../models/BaseModel';
import Field from '../models/Forms/Field';
import MenuItem from '../models/Menu/repository/MenuItem';

const VueGraphqlModels = {
  install(Vue, options = {}) {
    options.$pluginInstalled = true;
    Object.assign(BaseModel.prototype, options.baseModel || {});
    Object.assign(Field.prototype, options.field || {});
    Object.assign(MenuItem.prototype, options.menuItem || {});

    Object.assign(MenuItem.prototype, options.vue || {});

    if (options.dataLoader) {
      Object.assign(Field.prototype, options.dataLoader);
    }

    if (options.modelLoader) {
      Object.assign(Field.prototype, options.modelLoader);
    }

    if (options.gqlLoader) {
      Object.assign(BaseModel.prototype, options.gqlLoader);
    }
  }
};

export default VueGraphqlModels;
