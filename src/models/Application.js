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
   * @param {Config} config - Configuration options
   * @returns {Application}
   */
  constructor(config = new Config()) {
    if (Application.instance) {
      return Application.instance;
    }
    Application.instance = this;

    this.config = config;

    return this;
  }
}

export default new Application();
