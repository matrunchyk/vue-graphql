import Application from '../models/Application';
import Config from '../models/Config';

const VueGraphqlModels = {
  install(Vue, options) {
    const application = new Application();
    const config = new Config(Vue);

    Object.assign(config, options);
    application.configure(config);
    return application;
  }
};

export default VueGraphqlModels;
