import Config from './Config';

class Application {
  /**
   * Holds class instance
   *
   * @type {null|Application}
   */
  static instance = null;

  /**
   * Holds configuration options
   *
   * @type {Config}
   */

  config = new Config();

  /**
   * Class constructor
   *
   * @returns {Application}
   */
  constructor() {
    if (Application.instance) {
      return Application.instance;
    }
    Application.instance = this;

    return this;
  }

  /**
   * Configure application
   *
   * @param {Config} config
   */
  configure(config) {
    this.config = config;
  }
}

export default new Application();
