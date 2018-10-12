import Application from '../models/Application';
import Config from '../models/Config';

const VueGraphqlModels = {
  install(Vue, options) {
    const config = new Config(Vue);

    Object.assign(config, options);
    Application.configure(config);
    return Application;
  }
};

export default VueGraphqlModels;
