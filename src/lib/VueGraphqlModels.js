import BaseModel from '../models/BaseModel';
import Field from '../models/Forms/Field';
import MenuItem from '../models/Menu/repository/MenuItem';
import l from './Logger';

const VueGraphqlModels = {
  install(Vue, $vgmOptions = {}) {
    Object.assign(Vue.prototype, {
      $vgmOptions,
    });

    Vue.mixin({
      created() {
        if (!Vue.prototype.$pluginInstalled) {
          l.info(`Installed successfully. Version: ${BaseModel.version}`);

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
