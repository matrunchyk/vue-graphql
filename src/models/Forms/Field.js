import Collection from '../Collection';
import {
  spawn,
  getApplication,
} from '../../lib/utils';

export default class Field {
  chips = false;
  defValue = null;
  description = '';
  conditions = [];
  itemText = 'name';
  itemValue = 'name';
  label = '';
  loading = false;
  multiple = false;
  name = '';
  returnObject = false;
  selectOptions = [];
  source = '';
  sourceType = '';
  type = '';
  validations = {};
  value = null;
  application = getApplication();

  constructor({
    chips = false,
    defValue,
    description,
    conditions = [],
    itemText = 'name',
    itemValue = 'name',
    label,
    multiple = false,
    name,
    returnObject = false,
    source = '',
    sourceType = '',
    type,
    validations = {}
  }) {
    this.chips = chips;
    this.defValue = defValue;
    this.description = description;
    this.conditions = conditions;
    this.itemText = itemText;
    this.itemValue = itemValue;
    this.label = label;
    this.multiple = multiple;
    this.name = name;
    this.returnObject = returnObject;
    this.source = source;
    this.sourceType = sourceType;
    this.type = type;
    this.validations = validations;

    this.setOptions();
  }

  setOptions() {
    if (this.sourceType === 'json') {
      this.getOptionsFromFile()
        .then(({ default: items }) => {
          this.selectOptions = items;
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (this.sourceType === 'collection') {
      this.getCollection()
        .then(({ items }) => {
          this.selectOptions = items;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  async getOptionsFromFile() {
    this.setLoading();
    try {
      const items = await import(`${this.application.config.dataPath}/${this.source}`);

      this.setLoading(false);
      return items;
    } catch (err) {
      console.error(err);
      this.setLoading(false);
      return [];
    }
  }

  async getCollection() {
    this.setLoading();
    try {
      const { default: model } = await import(`${this.application.config.dataPath}${this.source}`);
      const { collection } = await model.get();

      this.setLoading(false);
      return collection;
    } catch (err) {
      console.error(err);
      this.setLoading(false);
      return Field.emptyCollection();
    }
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

  setLoading(loading = true) {
    this.loading = loading;
  }
}
