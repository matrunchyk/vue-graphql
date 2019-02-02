import Vue from 'vue';
import to from 'to-case';
import * as pluralize from 'pluralize';
import {
  spawn,
  getGQLDocumentName,
  getGQLDocument,
  defineProperties,
  cloneDeep,
  pickModelVariables,
} from '../lib/utils';
import ConfigurationException from './Exceptions/ConfigurationException';
import BaseException from './Exceptions/BaseException';
import ServerErrorException from './Exceptions/ServerResponseException';
import Collection from './Collection';

const gqlCache = {};

/**
 * Class BaseModel
 */
class BaseModel {
  __typename = 'BaseModel';
  _key = '';
  _result = null;
  mutationCreate = {};
  mutationUpdate = {};
  mutationDelete = {};
  mutationAttach = {};
  mutationDetach = {};
  query = {};
  queryMany = {};
  subscriptions = [];
  subscriptionsMany = [];
  createdAt = new Date();
  createdBy = {};
  loading = false;
  error = null;
  defaultSortBy = 'createdBy';
  primaryKey = '_key';
  inputDataKey = 'data';
  documentsLoaded = false;
  vue = {};
  casts = {};
  initialState = {};
  isDirty = false;
  uncountables = [];
  propagateChanges = true;
  saveVariables = [];
  updateVariables = [];

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
   * Returns variables being sent for save mutation
   *
   * @returns {*|{}}
   */
  get getCreateVariables() {
    return pickModelVariables(this, this.saveVariables);
  }

  /**
   * Returns variables being sent for update mutation
   *
   * @returns {*|{}}
   */
  get getUpdateVariables() {
    return pickModelVariables(this, this.updateVariables);
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

  get result() {
    if (Array.isArray(this._result)) {
      return new Collection(this._result);
    }

    return this._result;
  }

  /**
   * Finds a single model item
   *
   * @param variables
   * @returns {Promise<{BaseModel}>}
   */
  static async find(variables = {}) {
    const instance = this.empty(false);

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

    await instance.loadDocuments();
    return instance.fetchMany(instance.queryMany, variables);
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
  static empty(boot = true) {
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
   * Finds a single model item
   *
   * @property {Object} variables - variables to filter
   * @returns {Promise<{BaseModel[]}>}
   */
  async find(variables = {}) {
    await this.loadDocuments();
    return this.fetch(this.query, variables);
  }

  /**
   * Finds multiple model item
   *
   * @property {Object} variables - variables to filter
   * @returns {Promise<{BaseModel[]}>}
   */
  async get(variables = {}) {
    await this.loadDocuments();
    return this.fetch(this.queryMany, variables);
  }

  /**
   * Updates a model item and returns updated
   *
   * @returns {Promise<*>}
   */
  async update() {
    const prepared = {
      ...this.prepareVariables(this.updateVariables),
    };

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
    const prepared = {
      ...this.prepareVariables(this.getCreateVariables)
    };

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
    if (typeof this.vue !== 'object') {
      throw new ConfigurationException(`Vue instance must be VueComponent.
      Make sure that BaseModel.vue contains your local vue instance.`);
    }

    if (typeof this.vue.$apollo !== 'object') {
      throw new ConfigurationException(`It seems like vue-apollo is not installed.
      Make sure that you have installed vue-apollo and configured.`);
    }
    const opName = getGQLDocumentName(mutation, this.className);

    // Clears an error
    this.setError();
    // Sets a loading flag on
    this.setLoading();
    // Change updated at
    this.touch();

    try {
      // noinspection JSUnresolvedFunction
      /**
       * Perform a mutation
       */
      await this.vue.$apollo.mutate({
        mutation,
        variables,
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   [opName]: this,
        // },
        // Run hooks
        update: (store, { data }) => this.saved({
          store,
          query: mutation,
          queryName: opName,
          variables,
        }, data[opName]),
      });

    } catch (e) {
      this.setError(e);
      this.failed(e);
      throw e;
    } finally {
      // Sets a loading flag off
      this.setLoading(false);
      this.finished();
    }
    return this;
  }

  async fetchMany(query, variables = {}) {
    return this.fetch(query, variables, true);
  }

  async fetch(query, variables = {}, wantsMany = false) {
    const { subscribeToMore } = this;
    const opName = getGQLDocumentName(query, this.className);

    // Clears an error
    this.setError();

    // Sets a loading flag on
    this.setLoading();

    await this.validateCache();
    try {
      // noinspection JSUnresolvedFunction
      const { data: { [opName]: result } } = await this.vue.$apollo.query({
        errorPolicy: 'all',
        query,
        variables,
        subscribeToMore,
      });

      this._result = result;

      if (!wantsMany && Array.isArray(result)) {
        throw new ServerErrorException('Was expected an object but received an array.');
      }

      if (wantsMany && !Array.isArray(result)) {
        throw new ServerErrorException('Was expected an array but received an object.');
      }

      if (wantsMany || Array.isArray(result)) {
        const resCol = new Collection(result);
        const filtered = resCol.filter(s => s);

        return filtered.sortBy(this.defaultSortBy).map(i => this.hydrate(i));
      }

      return this.hydrate(cloneDeep(result));
    } catch (e) {
      this.setError(e);
      this.failed(e);

      if (e instanceof BaseException) {
        throw e;
      }

      return wantsMany ?
        new Collection([]) :
        this.hydrate({});
    } finally {
      this.setLoading(false);
      this.finished();
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

  async attach(models) {
    const m = Array.isArray(models) ? models : [models];

    await this.loadDocuments();

    return this.save(this.mutationAttach, {
      [this.primaryKey]: this[this.primaryKey],
      [this.inputDataKey]: m.map(m => m[m.primaryKey]),
    });
  }

  async detach(models) {
    const m = Array.isArray(models) ? models : [models];

    await this.loadDocuments();

    return this.save(this.mutationDetach, {
      [this.primaryKey]: this[this.primaryKey],
      [this.inputDataKey]: m.map(m => m[m.primaryKey]),
    });
  }

  // Helpers
  touch() {
    this.updatedAt = new Date();
  }

  getCacheAge() {
    return Number(localStorage.getItem('apollo-cache-persist-age'));
  }

  refreshCacheAge() {
    return localStorage.setItem('apollo-cache-persist-age', `${(new Date()).getTime()}`);
  }

  async validateCache() {
    const age = this.getCacheAge();

    if (age) {
      const diffSeconds = (new Date() - new Date(age)) / 1000;

      if (diffSeconds >= ((this.$vgmOptions || {}).cacheLife || 60)) {
        this.refreshCacheAge();

        if (this.$vgmOptions && this.$vgmOptions.cachePersistor) {
          await this.$vgmOptions.cachePersistor.purge();
        }
      }
    } else {
      this.refreshCacheAge();
    }
  }

  init() {}

  async loadDocuments() {
    if (this.documentsLoaded) {
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
        await this.getCachedGql('mutationAttach', `${gqlSrc}/mutations/attach${this.className}`);
        await this.getCachedGql('mutationDetach', `${gqlSrc}/mutations/detach${this.className}`);

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
    if (this[propName] === false) {
      return;
    }
    if ((!this[propName] || !this[propName].definitions)) {
      if (!gqlCache[path]) {
        gqlCache[path] = await getGQLDocument(
          this.gqlLoader,
          path
        );
      }

      this[propName] = gqlCache[path];
    }
  }

  prepareVariables(selection) {
    const inputFields = Object.keys(selection);
    const prepared = {};

    inputFields.forEach((key) => {
      // if value is Collection
      if (selection[key] instanceof Collection) {
        let collection = selection[key].all();

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
      } else if (selection[key] instanceof BaseModel) {
        Object.assign(prepared, { [key]: selection[key]._id });
        // Object.assign(prepared, { [key]: selection[key]
        // .[selection[key].primaryKey] });

        // if value is Array of Objects
      } else if (Array.isArray(selection[key])) {
        let arrayOfvalues = selection[key];

        if (arrayOfvalues.length) {
          const obj = arrayOfvalues[0];

          if (typeof obj === 'object') {
            arrayOfvalues = arrayOfvalues.map(ob => ob._id);
          }
        }

        Object.assign(prepared, { [key]: arrayOfvalues });

        // if value is Object
      } else if (typeof selection[key] === 'object' && selection[key]) {
        Object.assign(prepared, { [key]: selection[key]._id });

        // if value is simple type
      } else {
        Object.assign(prepared, { [key]: selection[key] });
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

  setError(error = null) {
    this.error = error;
  }

  saved({
    store,
    query,
    queryName,
    variables,
  }, props) {

    if (this.propagateChanges) {
      defineProperties(this, props);
    }
  }

  /**
   * Triggers on success or failure
   */
  finished() {}

  /**
   * Triggers when error on error
   * @param e
   */
  failed(e) {
    this._result = null;
  }
}

export default BaseModel;
