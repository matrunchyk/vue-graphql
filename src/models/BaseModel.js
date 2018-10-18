import Vue from 'vue';
import moment from 'moment';
import to from 'to-case';
import * as pluralize from 'pluralize';
import {
  spawn,
  pick,
  getGQLDocumentName,
  getGQLDocument,
  defineProperties,
  cloneDeep,
  version,
  isDebug,
} from '../lib/utils';
import Collection from './Collection';
import Form from './Forms/Form';
import ConfigurationException from './Exceptions/ConfigurationException';
import BaseException from './Exceptions/BaseException';
import ServerErrorException from './Exceptions/ServerResponseException';

const gqlCache = {};

/**
 * Class BaseModel
 */
class BaseModel {
  __typename = 'BaseModel';
  _key = '';
  mutationCreate = {};
  mutationUpdate = {};
  mutationDelete = {};
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
  vue = {};
  casts = {};
  initialState = {};
  isDirty = false;
  uncountables = [];

  /**
   * Class constructor
   *
   * @param {Object} params
   */
  constructor(params = {}) {
    if (Vue.prototype.$vgmOptions) {
      this.$vgmOptions = Vue.prototype.$vgmOptions;
    }
    this.vue = Object.getPrototypeOf(this).vue;

    if (params && params.boot === false) {
      return this;
    }

    this.boot(params);
  }

  // Static getters
  /**
   * Returns library version
   *
   * @returns {string}
   */
  static get version() {
    return version();
  }
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
    return this.createRoute();
  }

  get editRoutePath() {
    return this.createRoute('edit');
  }

  get deleteRoutePath() {
    return this.createRoute('delete');
  }

  get createRoutePath() {
    return this.createRoute('create');
  }

  get listRoutePath() {
    return this.createRoute('', true);
  }

  /**
   * Return Forms object
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
    const instance = this.empty(false);

    if (isDebug()) {
      console.info('".find" method executed');
    }
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
    const instance = this.empty(false);

    if (isDebug()) {
      console.info('".get" method executed');
    }
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
    if (isDebug()) {
      console.info('Spawning an empty collection...');
    }
    return new Collection();
  }

  /**
   * Returns an empty item of model.
   * It is useful when initializing the model in a vue component.
   *
   * @returns {BaseModel}
   */
  static empty(boot = true) {
    if (isDebug()) {
      console.info('Spawning an empty model...');
    }
    // noinspection JSValidateTypes
    return spawn(this, [{ boot }]);
  }

  // Instance methods
  /**
   * Boots a model
   *
   * @param params
   */
  boot(params = {}) {
    this.uncountables.forEach(rule => pluralize.addUncountableRule(rule));
    this.setDefaultTypename();

    Object.assign(this, this.defaults);
    const processedParams = this.processCasts(params);

    Object.assign(this, processedParams);
    // TODO: Probably needs to be async to free up the event loop
    // TODO: so the instance could be built w/o delays
    this.init();
    Object.assign(this.initialState, processedParams);
  }

  /**
   * Throws an exception whether vue our vue-router is not installed
   */
  validateRouter() {
    if (typeof this.vue !== 'object') {
      throw new ConfigurationException(`Vue instance must be VueComponent.
      Make sure that BaseModel.vue contains your local vue instance.`);
    }

    if (typeof this.vue.$route !== 'object') {
      throw new ConfigurationException(`It seems like vue-router is not installed.
      Make sure that you have installed vue-router and configured.`);
    }
  }

  createRoute(prefix = '', multiple = false) {
    this.validateRouter();
    const from = this.vue.$route.fullPath;
    const name = multiple ? pluralize(this.className) : this.className;

    return {
      name: to.camel(`${prefix}${name}`),
      params: {
        [this.primaryKey]: this[this.primaryKey],
      },
      query: {
        from,
      },
    };
  }

  /**
   * Processes casts
   */
  processCasts(params) {
    if (isDebug()) {
      console.info('Processing casts...');
    }
    const casted = Object.assign({}, params);

    Object.keys(casted).forEach((key) => {
      if (!this.casts[key]) {
        return;
      }
      casted[key] = (new this.casts[key](casted[key])).valueOf();
    });

    return casted;
  }

  /**
   * Reverts models state to an initial one
   * @returns {*}
   */
  revert() {
    const state = Object.assign(this, this.defaults, this.initialState);

    this.isDirty = false;
    return state;
  }

  gqlLoader(path) {
    if (typeof Vue.prototype.$vgmOptions.gqlLoader !== 'function') {
      return Promise.reject(`Unable to load "${path}": gqlLoader is not configured.
        Please make sure that 'BaseModel.gqlLoader(path)' method is overriden in your local BaseModel
        and returns lazy-loaded GQL document. See library example for reference.`);
    }
    return Vue.prototype.$vgmOptions.gqlLoader(path);
  }

  /**
   * Updates a model item and returns updated
   *
   * @returns {Promise<*>}
   */
  async update() {
    const prepared = this.prepareFieldsVariables();

    if (isDebug()) {
      console.info('".update" method executed');
    }

    await this.loadDocuments();
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

    if (isDebug()) {
      console.info('".create" method executed');
    }
    await this.loadDocuments();
    return this.save(this.mutationCreate, {
      [this.inputDataKey]: prepared,
    });
  }

  /**
   * Deletes a model item and returns a result
   *
   * @returns {Promise<*>}
   */
  async delete() {
    if (isDebug()) {
      console.info('".delete" method executed');
    }

    await this.loadDocuments();
    return this.save(this.mutationDelete, {
      [this.primaryKey]: this[this.primaryKey],
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
    if (isDebug()) {
      console.info('".save" method executed');
    }
    if (typeof this.vue !== 'object') {
      throw new ConfigurationException(`Vue instance must be VueComponent.
      Make sure that BaseModel.vue contains your local vue instance.`);
    }

    if (typeof this.vue.$apollo !== 'object') {
      throw new ConfigurationException(`It seems like vue-apollo is not installed.
      Make sure that you have installed vue-apollo and configured.`);
    }
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
      if (isDebug()) {
        console.info('Save: Performing Apollo mutation...');
      }
      const result = await this.vue.$apollo.mutate({
        mutation,
        variables,
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   [opName]: this,
        // },
        // Run hooks
        update: (store, { data }) => this.updated(store, data[opName]),
      });

      if (isDebug()) {
        console.info('Save: Apollo mutation status: OK');
      }

      // Update properties returned from a server
      defineProperties(this, result.data[opName]);
    } catch (e) {
      if (isDebug()) {
        console.info('Save: Apollo mutation status: FAIL');
      }
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

    if (isDebug()) {
      console.info('".fetch" method executed');
    }
    this.setLoading();
    try {
      // noinspection JSUnresolvedFunction
      const { data: { [opName]: result } } = await this.vue.$apollo.query({
        errorPolicy: 'all',
        query,
        variables,
        subscribeToMore,
      });

      if (isDebug()) {
        console.info('Fetch: Apollo mutation status: OK');
      }

      if (!wantsMany && Array.isArray(result)) {
        throw new ServerErrorException('Was expected an object but received an array.');
      }

      if (wantsMany && !Array.isArray(result)) {
        throw new ServerErrorException('Was expected an array but received an object.');
      }

      if (wantsMany || Array.isArray(result)) {
        const resCol = new Collection(result);
        const filtered = resCol.filter(s => s);
        const sorted = filtered.sortBy(this.defaultSortBy);

        if (isDebug()) {
          console.info('Fetch: hydrating a collection');
        }
        return sorted.map(i => this.hydrate(i));
      }

      if (isDebug()) {
        console.info('Fetch: hydrating a single model');
      }
      return this.hydrate(cloneDeep(result));
    } catch (e) {
      if (isDebug()) {
        console.info('Fetch: Apollo mutation status: FAIL');
      }
      if (e instanceof BaseException) {
        throw e;
      }
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
    if (isDebug()) {
      console.info('Loading documents...');
    }
    if (this.documentsLoaded) {
      if (isDebug()) {
        console.info('Documents already have loaded, exiting.');
      }
      return Promise.resolve();
    }
    return new Promise(async (resolve, reject) => {
      const entityNamePlural = pluralize(this.className);
      const gqlSrc = to.camel(entityNamePlural);

      try {
        await this.getCachedGql('query', `${gqlSrc}/queries/fetch${this.className}`);
        await this.getCachedGql('queryMany', `${gqlSrc}/queries/fetch${entityNamePlural}`);
        await this.getCachedGql('mutationCreate', `${gqlSrc}/mutations/create${this.className}`);
        await this.getCachedGql('mutationUpdate', `${gqlSrc}/mutations/update${this.className}`);
        await this.getCachedGql('mutationDelete', `${gqlSrc}/mutations/delete${this.className}`);

        this.documentsLoaded = true;
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Retrieves cached GQL document from a local cache and adds it of it doesn't there yet.
   *
   * @param propName {string}
   * @param path {string}
   * @returns {Promise<void>}
   */
  async getCachedGql(propName, path) {
    if (isDebug()) {
      console.info(`Inititated retrieval of ${path} from a cache...`);
    }
    if (this[propName] === false) {
      if (isDebug()) {
        console.info(`"${propName}" is set to 'false', skipping.`);
      }
      return;
    }
    if ((!this[propName] || !this[propName].definitions)) {
      if (isDebug()) {
        console.info(`"${propName}" was not set, proceeding to an autoloading...`);
      }
      if (!gqlCache[path]) {
        if (isDebug()) {
          console.info(`No cache found for ${path}, proceeding to a loader...`);
        }
        gqlCache[path] = await getGQLDocument(
          this.gqlLoader,
          path
        );
      }

      if (isDebug()) {
        console.info(`Caching "${propName}" for ${path}`);
      }
      this[propName] = gqlCache[path];
    }
  }

  /**
   * Prepares inputFieldsVariables for sending to the backend.
   * Values must be either String (ID) or Array of Strings (IDs)
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
  }

  // Hooks
  created(props) {
    if (isDebug()) {
      console.info('Created hook fired');
    }
    defineProperties(this, props);
  }

  updated(store, props) {
    if (isDebug()) {
      console.info('Updated hook fired');
    }
    defineProperties(this, props);
  }
}

export default BaseModel;
