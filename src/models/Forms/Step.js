import Collection from '../Collection';
import { spawn } from '../../lib/utils';
import Field from './Field';

export default class Step {
  label = '';
  fields = [];
  conditions = [];

  constructor({ label, fields, conditions = [] }) {
    this.label = label;
    this.conditions = conditions;
    this.fields = fields.map(field => new Field(field));
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
