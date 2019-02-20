import Vue from 'vue';
import gql from 'graphql-tag';
import to from 'to-case';
import * as pluralize from 'pluralize';
import {
  spawn,
  defineProperties,
  cloneDeep,
  pickModelVariables,
  getGQLDocumentName
} from '../lib/utils';
import ConfigurationException from './Exceptions/ConfigurationException';
import ServerErrorException from './Exceptions/ServerResponseException';
import Collection from './Collection';
import InvalidArgumentException from './Exceptions/InvalidArgumentException';

/**
 * Class BaseModel
 */
class BaseModel {
  __typename = 'BaseModel';
  _documentsLoaded = false;
  loading = false;
  error = null;
  defaultSortBy = 'uuid';
  primaryKey = 'uuid';
  dataKey = '';
  _result = null;
  vue = {};
  initialState = {};
  isDirty = false;
  uncountables = [];
  propagateChanges = true;
  flattenVariables = false;
  attributes = {};
  queryVariables = {};
  createVariables = [];
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
    return pickModelVariables(this, this.createVariables);
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

  get inputDataKey() {
    return this.dataKey || to.camel(this.className);
  }

  get raw() {
    return this._result;
  }

  /**
   * Finds a single model item
   *
   * @param variables
   * @returns {Promise<{BaseModel}>}
   */
  static async findOne(variables = {}) {
    return this.empty(false).findOne(variables);
  }

  /**
   * Finds multiple model item
   *
   * @property {Object} variables - variables to filter
   * @returns {Promise<{BaseModel[]}>}
   */
  static async findMany(variables = {}) {
    return this.empty(false).findMany(variables);
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
  static empty(boot = false) {
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

    Object.assign(this.initialState, params);
    Object.assign(this, this.defaults, params);
    this.init();
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
   * Processes attributes
   */
  processAttributes() {
    Object.keys(this.attributes).forEach((attrName) => {
      const Factory = this.attributes[attrName];
      const value = this[attrName];

      if (!Factory) {
        return;
      }

      // Backup original
      Object.defineProperty(this, `_${attrName}`, {
        value,
        writable: false
      });

      // Casting
      if (Array.isArray(Factory)) {
        if (!Array.isArray(value)) {
          throw new InvalidArgumentException(`Attribute "${attrName}" has type Array, but class property doesn't.`);
        }
        this[attrName] = value.map(el => this.processAttribute(Factory[0], el));
      } else {
        this[attrName] = this.processAttribute(Factory, value);
      }
    });
  }

  // noinspection JSMethodCanBeStatic
  processAttribute(Factory, value) {
    let ResolvedFactory = Factory;
    let decorator = 'valueOf';
    let construct = true;

    if (typeof Factory === 'object') {
      ResolvedFactory = Factory.type || Object;
      decorator = Factory.decorator || decorator;
      construct = Factory.construct || construct;
    }

    if (Object.is(ResolvedFactory, Symbol) || Object.is(ResolvedFactory, Function)) {
      construct = false;
    }

    if (construct) {
      return (new ResolvedFactory(value))[decorator]();
    }
    return ResolvedFactory(value)[decorator]();
  }

  /**
   * Reverts models state to an initial one
   * @returns {*}
   */
  revert() {
    const state = Object.assign(this, this.defaults, this.initialState);

    this.processAttributes(this.initialState);
    this.isDirty = false;
    return state;
  }

  /**
   * Finds a single model item
   *
   * @property {Object} variables - variables to filter
   * @returns {Promise<{BaseModel[]}>}
   */
  async findOne(variables = {}) {
    const normalizedVariables = this.queryVariables || variables;
    const opName = `fetch${this.className}`;
    const query = this.buildQuery('query', opName, normalizedVariables);

    return this.fetch(query, normalizedVariables, false, opName);
  }

  /**
   * Finds multiple model item
   *
   * @property {Object} variables - variables to filter
   * @returns {Promise<{BaseModel[]}>}
   */
  async findMany(variables = {}) {
    const normalizedVariables = this.queryVariables || variables;
    const opName = `fetch${this.className}`;
    const query = this.buildQuery('query', opName, normalizedVariables);

    return this.fetch(query, normalizedVariables, true, opName);
  }

  /**
   * Updates a model item and returns updated
   *
   * @returns {Promise<*>}
   */
  async update() {
    const prepared = {
      ...this.prepareVariables(this.getUpdateVariables),
    };
    const variables = this.flattenVariables ?
      prepared :
      {
        [this.inputDataKey]: prepared,
      };
    const opName = `update${this.className}`;
    const query = this.buildQuery('mutation', opName, variables);

    return this.save(query, variables, opName);
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
    const variables = this.flattenVariables ?
      prepared :
      {
        [this.inputDataKey]: prepared,
      };

    await this.loadDocuments();
    return this.save(this.mutationCreate, variables);
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
   * @param opName
   * @returns {Promise<BaseModel>}
   */
  async save(mutation, variables = {}, opName) {
    if (typeof this.vue !== 'object') {
      throw new ConfigurationException(`Vue instance must be VueComponent.
      Make sure that BaseModel.vue contains your local vue instance.`);
    }

    if (typeof this.vue.$apollo !== 'object') {
      throw new ConfigurationException(`It seems like vue-apollo is not installed.
      Make sure that you have installed vue-apollo and configured.`);
    }

    // Clears an error
    this.setError();
    // Sets a loading flag on
    this.setLoading();
    // Change updated at
    this.touch();

    try {
      /**
       * Perform a mutation
       */
      await this.vue.$apollo.mutate({
        mutation,
        variables,
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

  async fetch(query, variables, wantsMany, opName) {
    const { subscribeToMore } = this;

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

      if (!wantsMany && Array.isArray(result)) {
        const e = new ServerErrorException('Was expected an object but received an array.');

        this.setError(e);
        this.failed(e);
        throw e;
      }

      if (wantsMany && !Array.isArray(result)) {
        const e = new ServerErrorException('Was expected an array but received an object.');

        this.setError(e);
        this.failed(e);
        throw e;
      }

      if (wantsMany || Array.isArray(result)) {
        const resCol = new Collection(result);
        const filtered = resCol.filter(s => s);

        return filtered.sortBy(this.defaultSortBy).map(i => this.hydrate(i));
      }

      return this.hydrate({
        ...cloneDeep(result),
        _result: result,
      });
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
    const hydrated = new this.constructor(item);

    hydrated.processAttributes();
    return hydrated;
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

    this._result = props;

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

  toJSON() {
    return this._result;
  }

  toQueryString() {
    return `{ ${(Object.keys(this.schema).map((key) => {
      const parent = this.schema[key].type || this.schema[key];

      return parent instanceof BaseModel ? `\n${key}${parent.toQueryString()}` : `\n${key}`;
    }))} }`;
  }

  buildTypedVariables(variables) {
    return variables.map((key) => {
      const type = (variables[key] || {}).type || variables[key];
      const isRequired = (variables[key] || {}).required || false;

      return `$${key}: ${type}${isRequired ? '!' : ''}`;
    }).join(', ');
  }

  buildQuery(type, name, variables = null) {
    const body = this.toQueryString();
    const typedVars = this.buildTypedVariables(variables);
    const mappedVars = variables.map((key) => `${key}: $${key}`).join(', ');
    const gqlString = `${type} ${name}(${typedVars}) { ${name}(${mappedVars}) ${body} }`;

    return gql`${gqlString}`;
  }
}

export default BaseModel;
