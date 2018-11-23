import Vue from 'vue';
import Exceptions from '../models/Exceptions';
import pkg from '../../package';

/**
 * @module Utils
 */

/* Environment */

/**
 * Determines whether the debug mode is on
 *
 * @returns {Boolean}
 */
function isDebug() {
  return !!(Vue.prototype.$vgmOptions && Vue.prototype.$vgmOptions.debug);
}

/**
 * Returns library version
 *
 * @returns {string}
 */
function version() {
  return pkg.version;
}

/**
 * Returns true if mobile environment
 *
 * @returns {boolean}
 */
/* istanbul ignore next */
function isMobile/* istanbul ignore next */() {
  return !!navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
}

/* Strings */

/**
 * Capitalizes first letters of each word
 * @param str {string} A string to be processed
 * @returns {string}
 * @example
 * ucwords('This is a test') // This Is A Test
 * ucwords('This IS a TEST') // This IS A TEST
 */
function ucwords(str) {
  return `${str}`.replace(/^(.)|\s+(.)/g, $1 => $1.toUpperCase());
}

/**
 * Makes first letter of str lowercase
 *
 * @param str {string} A string to be processed
 * @returns {string}
 * @example
 * lowerCaseFirst('This is a test') // this Is a test
 * lowerCaseFirst('THIS IS a TEST') // tHIS IS a TEST
 * lowerCaseFirst('THIS IS') // tHIS IS
 */
function lowerCaseFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Formats bytes to human readable string
 *
 * @param bytes {number} Bytes to be formatted
 * @returns {string}
 * @example
 * humanBytes(0); // 0.0 B
 * humanBytes(1234); // 1.21 KB
 * humanBytes(1234567890); // 1.15 GB
 */
function humanBytes(bytes) {
  if (bytes === 0) { return '0.00 B'; }
  const e = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / (1024 ** e)).toFixed(2)} ${' KMGTP'.charAt(e)}B`.replace('  ', ' ');
}

/* HTTP */

/**
 * Makes HTTP POST call with payload and returns parses JSON
 *
 * @param url {string} URL to be submitted on
 * @param data {object} Data to be submitted to
 * @returns {Promise<Response>}
 */
function httpPost(url, data) {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data)
  }).then(response => response.json());
}

/* Core */
/**
 * Lazy loads a graphql document
 *
 * @param loader {function}
 * @param path {string} A path to the document
 * @returns {Promise<{doc: *} | never>}
 */
function getGQLDocument(loader, path) {
  const segments = path.split('/');
  const docName = segments[segments.length - 1];

  if (isDebug()) {
    console.info(`Passing loading process of ${path} to a loader....`);
  }
  return loader(path)
    .catch(() => {
      if (isDebug()) {
        console.info(`No GQL found using path ${path}. Skipping.`);
      }
      return {
        [docName]: {},
      };
    })
    .then(({ [docName]: doc }) => {
      if (isDebug()) {
        console.info(`${path} has been imported successfully.`);
      }
      return doc;
    });
}

/**
 * Spawns a new dynamic class with parameters
 *
 * @param constructor {function} A class to spawn
 * @param args {array} Arguments to be passed to the class' constructor
 * @returns {F} An instance of the class
 */
function spawn(constructor, args = []) {
  if (isDebug()) {
    console.info(`Spawning a new instance of ${constructor.name}`);
  }
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
}

/**
 * Deep (not shallow) clone of the object
 *
 * @param obj {object} Source object to clone
 * @returns {object}
 * @example
 * const a = {b: 1, {d: 2} };
 * const b = a;
 * const c = cloneDeep(a);
 * console.log(b === a); // true
 * console.log(c === a); // false
 *
 * a.d = 123;
 * console.log(b.d); // 123
 * console.log(c.d); // undefined
 */
function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Removes __typename from object recursively
 */
function stripTypename(obj) {
  return JSON.parse(JSON.stringify(obj, (k, v) => (k === '__typename' ? undefined : v)));
}

/**
 * Returns a merged meta object for all matched route objects
 *
 * @param route {object} Vue-router route object
 * @returns {object}
 */
function findRouteMetas(route) {
  return route.matched.map(m => m.meta)
    .reduce((accumulator, current) => Object.assign(accumulator, current), {});
}

/**
 * Returns an array of items matched in both arrays
 *
 * @param one {array} First array
 * @param two {array} Second array
 * @returns {any[]}
 * @example
 * intersect([], []); // []
 * intersect([123, 456], []); // []
 * intersect([123, 456, 789], [789, 123]); // [123, 789]
 */
function intersect(one, two) {
  const setA = new Set(one);
  const setB = new Set(two);
  const intersection = new Set([...setA].filter(s => setB.has(s)));

  return Array.from(intersection);
}

/**
 * Sorts an array of objects by given sort options w/o mutating the original
 *
 * @param items {array} An array to sort
 * @param sortOpts {object} Sort keys with its directions.
 * @returns {object[]}
 * @example
 * sortBy([
 *    { weight: 1 },
 *    { weight: 3 },
 *    { weight: 2 },
 *    { weight: 10, name: 'ttt' },
 *    { weight: 8 },
 *    { name: 'bbb' },
 *    { weight: 0, name: 'aaa' },
 *    { weight: 10, name: 'lll' },
 *    { weight: 9 }
 * ], { weight: 'desc', name: 'asc' })
 * // Result:
 * Array [
 *    { weight: 10, name: 'lll' },
 *    { weight: 10, name: 'ttt' },
 *    { weight: 9 },
 *    { weight: 8 },
 *    { weight: 3 },
 *    { weight: 2 },
 *    { weight: 1 },
 *    { weight: 0, name: 'aaa' },
 *    { name: 'bbb' }
 * ]
 */
function sortBy(items, sortOpts = {}) {
  const newItems = items.slice(0);
  const sortKeys = Object.keys(sortOpts);

  if (!sortKeys.length) {
    return newItems;
  }

  return newItems.sort((a, b) => {
    let level = sortKeys.length + 1;
    let operand = 0;

    sortKeys.some((key) => {
      level -= 1;
      const dirSign = sortOpts[key] === 'desc' ? -1 : 1;
      const normA = a[key] ? a[key] : 0;
      const normB = b[key] ? b[key] : 0;

      if ((normA > normB)) {
        operand = level * dirSign;
        return true;
      }

      if ((normA < normB)) {
        operand = level * dirSign * -1;
        return true;
      }

      return false;
    });

    return operand;
  });
}

/**
 * Finds an object in array of objects recursively by object key
 *
 * @param source {object[]} Source array to find in
 * @param key {string} Object key to search by
 * @param value {any} Key value to search by
 * @param entriesKey='entries' {string} A entries key to go to the deeper level by
 * @returns {object|null}
 * @example
 * findRecursive([
 *   {
 *     id: 123,
 *     name: 'Test 1',
 *     entries: [],
 *   },
 *   {
 *     id: 456,
 *     name: 'Test 2',
 *     entries: [
 *       {
 *         id: 789,
 *         name: 'Test 3',
 *         entries: [],
 *       },
 *     ],
 *   },
 * ], 'id', 789); // {id: 789, name: 'Test 3', entries: []}
 *
 * findRecursive([
 *   {
 *     id: 123,
 *     name: 'Test 1',
 *     files: [],
 *   },
 *   {
 *     id: 456,
 *     name: 'Test 2',
 *     files: [
 *       {
 *         id: 789,
 *         name: 'Test 3',
 *         files: [],
 *       },
 *     ],
 *   },
 * ], 'id', 789, 'files'); // {id: 789, name: 'Test 3', files: []}
 */
function findRecursive(source, key, value, entriesKey = 'entries') {
  let res = null;

  source.some(function iter(item) {
    if (item[key] === value) {
      res = item;
      return true;
    }
    return Array.isArray(item[entriesKey]) && item[entriesKey].some(iter);
  });

  return res;
}

/**
 * Picks selected items from the object
 *
 * @param source {Object}
 * @param selected {Array}
 * @returns {*|{}}
 * @example
 * pick({ a: 1, b: 2, c: 3}, ['a', 'c']) // Returns {a: 1, c: 2}
 * pick({ a: 1, b: 2, c: 3}, ['a', 'd']) // Returns {a: 1}
 * pick({ a: 1, b: 2, c: 3}, []) // Returns {}
 * pick({ a: 1, b: 2, c: { d: 1} }, ['c']) // Returns { c: { d: 1 } }
 */
function pick(source = {}, selected = []) {
  return selected.reduce((obj, key) => ({ ...obj, [key]: source[key] }), {});
}

/**
 * Retrieves a document name of GraphQL document
 *
 * @param document {GraphQLDocument}
 * @param callerClass {String}
 * @returns {String}
 */
function getGQLDocumentName(document, callerClass = 'model class') {
  if (
    !document ||
    !document.definitions ||
    !Array.isArray(document.definitions) ||
    !document.definitions.length
  ) {
    throw new Exceptions.InvalidArgumentException(`Invalid GraphQL document specified.
    Did you forget to add query or mutation to ${callerClass}?`);
  }
  const definition = document.definitions.find(def => def.kind === 'OperationDefinition');

  return definition ? definition.name.value : '';
}

/**
 * Defines new or modifies existing properties directly on an object,
 * returning the object.
 *
 * @param source {Object} The object on which to define or modify properties.
 * @param target {Object} An object whose own enumerable properties constitute descriptors
 * for the properties to be defined or modified
 * @returns {any}
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
 * @example
 * const person1 = {
 *   set name(newName) {
 *       console.log(newName)
 *   }
 * }
 * const person3 = {}
 * defineProperties(person3, person1)
 * person3.name = 'x'
 * > "x"
 */
function defineProperties(source = {}, target = {}) {
  return Object.defineProperties(source, Object.getOwnPropertyDescriptors(target));
}

/* File */
/**
 * Reads a file into Array Buffer
 *
 * @param file {Blob} Blob-like structure to read from
 * @returns {Promise<any>}
 */
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = ({ target: { result } }) => {
      resolve(result);
    };
    reader.onerror = reject;
    reader.onabort = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Waits for a certain amount of seconds before resolving.
 * It's useful only when accompanied with await and when it's required to simulate a pause.
 *
 * @param seconds {Number}
 * @returns {Promise<any>}
 * @example
 * async function myFunction() {
 *   await sleep(5);
 *   console.log('Printed after 5 seconds.')
 * }
 */
function sleep(seconds = 1) {
  return new Promise(resolve => window.setTimeout(resolve, seconds * 1000));
}

export {
  isDebug,
  version,
  isMobile,
  getGQLDocument,
  ucwords,
  lowerCaseFirst,
  humanBytes,
  sortBy,
  pick,
  defineProperties,
  getGQLDocumentName,
  httpPost,
  readFile,
  spawn,
  sleep,
  intersect,
  cloneDeep,
  stripTypename,
  findRecursive,
  findRouteMetas
};
