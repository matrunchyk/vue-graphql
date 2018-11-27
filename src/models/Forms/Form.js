import Collection from '../Collection';
import { logger, spawn } from '../../lib/utils';
import Step from './Step';

export default class Form {
  steps = [];
  context = {};

  constructor(context) {
    this.context = context;
    context.formOptions()
      .then(({ default: { steps } }) => {
        this.steps = steps.map(option => new Step(option));
      })
      .catch((error) => {
        logger(error);
      });
  }

  /**
   * Returns an empty collection of model items.
   * It is useful when initializing the model in a vue component.
   *
   * @returns {Collection}
   */
  static emptyCollection() {
    return new Collection();
  }

  /**
   * Returns an empty item of model.
   * It is useful when initializing the model in a vue component.
   *
   * @returns {BaseModel}
   */
  static empty() {
    // noinspection JSValidateTypes
    return spawn(this);
  }
}
