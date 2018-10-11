import moment from 'moment';
import to from 'to-case';
import * as pluralize from 'pluralize';
import {
  spawn,
  pick,
  getGQLDocumentName,
  getGQLDocument,
  defineProperties,
  cloneDeep
} from '../lib/utils';
import Collection from './Collection';
import Form from './Forms/Form';
import Application from './Application';

/**
 * Class BaseModel
 */
class BaseModel {
  __typename = 'Base';
  _key = '';
  mutationCreate = {};
  mutationUpdate = {};
  query = {};
  queryMany = {};
  subscriptions = [];
  subscriptionsMany = [];
  createdAt = new Date();
  createdBy = {};
  loading = false;
  defaultSortBy = 'createdBy';
  inputFields = [];
  primaryKey = '_key';
  inputDataKey = 'data';
  documentsLoaded = false;
  pForm = null;
  formOptions = null;
  application = null;

  /**
   * Class constructor
   *
   * @param {Object} params
   */
  constructor(params = {}) {
    this.setDefaultTypename();
    // noinspection JSIgnoredPromiseFromCall
    this.loadDocuments();
    // Object.defineProperties(this, Object.getOwnPropertyDescriptors(this.defaults));
    // Object.defineProperties(this, Object.getOwnPropertyDescriptors(params));
    Object.assign(this, this.defaults, params);
    this.init();
    this.application = Application;
  }

  // Static getters
  /**
   * Returns static class name
   *
   * @returns {String}
   */
  static get className() {
    // noinspection JSUnresolvedVariable
    return this.name;
  }

  // Instance getters
  /**
   * Defines and returns model defaults
   *
   * @returns {{}}
   */
  get defaults() {
    return {};
  }

  /**
   * Returns a formatted (from-now) create date
   *
   * @returns {string}
   */
  get createdAtFormatted() {
    return moment(this.createdAt).fromNow();
  }

  /**
   * Returns a timestamped date
   *
   * @returns {Number}
   */
  get createdAtTimestamp() {
    return moment(this.createdAt).valueOf();
  }

  /**
   * Returns variables being sent as input data
   *
   * @returns {*|{}}
   */
  get inputFieldsVariables() {
    return pick(this, this.inputFields);
  }

  /**
   * Returns an instance class name
   *
   * @returns {*}
   */
  get className() {
    return this.constructor.name;
  }

  /**
   * Defines a router path to a single asset
   *
   * @returns {{name: string, params: {key: string}}}
   */
  get routerPath() {
    const from = this.application.config.vue.$route.fullPath;

    return {
      name: to.snake(this.className),
      params: {
        key: this._key,
      },
      query: {
        from,
      },
    };
  }

  /**
   * Return Froms object
   *
   * @returns {Form}
   */
  get form() {
    if (!this.pForm) {
      this.pForm = new Form(this);
    }
    return this.pForm;
  }

  // Static methods
  /**
   * Finds a single model item
   *
   * @param variables
   * @returns {Promise<{BaseModel}>}
   */
  static async find(variables = {}) {
    const instance = spawn(this);

    await instance.loadDocuments();
    return instance.fetch(instance.query, variables);
  }

  /**
   * Finds multiple model item
   *
   * @property {Object} variables - variables to filter
   * @returns {Promise<{BaseModel[]}>}
   */
  static async get(variables = {}) {
    const instance = spawn(this);

    await instance.loadDocuments();
    return instance.fetch(instance.queryMany, variables);
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

  // Instance methods
  /**
   * Updates a model item and returns updated
   *
   * @returns {Promise<*>}
   */
  async update() {
    const prepared = this.prepareFieldsVariables();

    return this.save(this.mutationUpdate, {
      [this.primaryKey]: this[this.primaryKey],
      [this.inputDataKey]: prepared,
    });
  }

  /**
   * Creates a new model item and returns it
   *
   * @returns {Promise<*>}
   */
  async create() {
    const prepared = this.prepareFieldsVariables();

    return this.save(this.mutationCreate, {
      [this.inputDataKey]: prepared,
    });
  }

  /**
   * Saves a model item via GQL
   *
   * @param mutation
   * @param variables
   * @returns {Promise<BaseModel>}
   */
  async save(mutation, variables = {}) {
    const opName = getGQLDocumentName(mutation, this.className);

    // Sets a loading flag on
    this.setLoading();
    // Change updated at
    this.touch();

    try {
      // noinspection JSUnresolvedFunction
      /**
       * Perform a mutation
       */
      const result = await this.application.config.apollo.mutate({
        mutation,
        variables,
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   [opName]: this,
        // },
        // Run hooks
        update: (store, { data }) => this.updated(store, data[opName]),
      });

      // Update properties returned from a server
      defineProperties(this, result.data[opName]);
    } catch (e) {
      console.warn(e.message);
    } finally {
      // Sets a loading flag off
      this.setLoading(false);
    }
    return this;
  }

  async fetch(query, variables = {}) {
    const { subscribeToMore } = this;
    const opName = getGQLDocumentName(query, this.className);
    const wantsMany = variables._key === undefined;

    this.setLoading();
    try {
      // noinspection JSUnresolvedFunction
      const { data: { [opName]: result } } = await this.application.config.apollo.query({
        errorPolicy: 'all',
        query,
        variables,
        subscribeToMore,
      });

      if (wantsMany || Array.isArray(result)) {
        const resCol = new Collection(result);
        const filtered = resCol.filter(s => s);
        const sorted = filtered.sortBy(this.defaultSortBy);

        return sorted.map(i => this.hydrate(i));
      }

      return this.hydrate(cloneDeep(result));
    } catch (e) {
      console.error(e.message);
      return wantsMany ?
        new Collection([]) :
        this.hydrate({});
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Returns subscription listeners for specific query
   *
   * @param {String} queryName GraphQL query name
   * @returns {Array}
   */
  subscribeToMore(queryName) {
    const subscribeToMore = [];

    this.subscriptionsMany.forEach((sub) => {
      // eslint-disable-next-line no-new-object
      const normalizedSub = sub instanceof String ? { document: sub } : new Object(sub);

      if (!normalizedSub || !normalizedSub.document) {
        return;
      }
      const opSubName = getGQLDocumentName(normalizedSub.document, this.className);

      const subscription = Object.assign({
        document: normalizedSub.document,
        updateQuery(previousResult, { subscriptionData: { data: { [opSubName]: result } } }) {
          return {
            [queryName]: [
              ...previousResult[queryName],
              result,
            ],
          };
        },
      }, normalizedSub);

      subscribeToMore.push(subscription);
    });
    return subscribeToMore;
  }

  // Helpers
  touch() {
    this.updatedAt = new Date();
  }

  init() {}

  async loadDocuments() {
    if (this.documentsLoaded) {
      return Promise.resolve();
    }
    return new Promise(async (resolve, reject) => {
      const entityNamePlural = pluralize(this.className);
      // noinspection JSUnresolvedFunction
      const entitiesFolder = to.camel(entityNamePlural);

      try {
        if (!this.query.definitions) {
          this.query = await getGQLDocument(`${entitiesFolder}/queries/fetch${this.className}`);
        }

        if (!this.queryMany.definitions) {
          this.queryMany = await getGQLDocument(`${entitiesFolder}/queries/fetch${entityNamePlural}`);
        }

        if (!this.mutationUpdate.definitions) {
          this.mutationUpdate = await getGQLDocument(`${entitiesFolder}/mutations/update${this.className}`);
        }

        if (!this.mutationCreate.definitions) {
          this.mutationCreate = await getGQLDocument(`${entitiesFolder}/mutations/create${this.className}`);
        }

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * This function prepared inputFieldsVariables for sending to backend
   * values must be String (ID) or Array of IDs
   */
  prepareFieldsVariables() {
    const { inputFieldsVariables } = this;
    const inputFields = Object.keys(inputFieldsVariables);
    const prepared = {};

    inputFields.forEach((key) => {
      // if value is Collection
      if (inputFieldsVariables[key] instanceof Collection) {
        let collection = inputFieldsVariables[key].all();

        collection = collection.filter(item => item);
        if (Array.isArray(collection) && collection.length) {
          const obj = collection[0];

          if (typeof obj === 'object') {
            collection = collection.filter(ob => ob._id);
            collection = collection.map(ob => ob._id);
          }
        }
        Object.assign(prepared, { [key]: collection });

        // if value is Object extended BaseModel
      } else if (inputFieldsVariables[key] instanceof BaseModel) {
        Object.assign(prepared, { [key]: inputFieldsVariables[key]._id });
        // Object.assign(prepared, { [key]: inputFieldsVariables[key]
        // .[inputFieldsVariables[key].primaryKey] });

        // if value is Array of Objects
      } else if (Array.isArray(inputFieldsVariables[key])) {
        let arrayOfvalues = inputFieldsVariables[key];

        if (arrayOfvalues.length) {
          const obj = arrayOfvalues[0];

          if (typeof obj === 'object') {
            arrayOfvalues = arrayOfvalues.map(ob => ob._id);
          }
        }
        Object.assign(prepared, { [key]: arrayOfvalues });

        // if value is Object
      } else if (typeof inputFieldsVariables[key] === 'object' && inputFieldsVariables[key]) {
        Object.assign(prepared, { [key]: inputFieldsVariables[key]._id });

        // if value is simple type
      } else {
        Object.assign(prepared, { [key]: inputFieldsVariables[key] });
      }
    });
    return prepared;
  }

  hydrate(item) {
    return new this.constructor(item);
  }

  ifTypeName(type) {
    return this.__typename === type;
  }

  setDefaultTypename() {
    this.__typename = this.className;
  }

  setLoading(loading = true) {
    this.loading = loading;
    // noinspection JSUnresolvedFunction
    this.application.config.vuex.dispatch('app/setLoading', { loading });
  }

  // Hooks
  updated() {}
}

export default BaseModel;
