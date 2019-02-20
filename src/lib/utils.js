import Vue from 'vue';
import pkg from '../../package';
import InvalidArgumentException from '../models/Exceptions/InvalidArgumentException';

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
 * Spawns a new dynamic class with parameters
 *
 * @param constructor {function} A class to spawn
 * @param args {array} Arguments to be passed to the class' constructor
 * @returns {F} An instance of the class
 */
function spawn(constructor, args = []) {
  // const F = class extends constructor {};
  // return new F(...args);
  return Reflect.construct(constructor, args);
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
 * @param entriesKey='entries' {string} An entries key to go to the deeper level by
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
 * @param source {Object} Source object
 * @param selected {Array} Keys to select
 * @returns {*|{}}
 * @example
 * pick({ a: 1, b: 2, c: 3}, ['a', 'c']) // Returns {a: 1, c: 3}
 * pick({ a: 1, b: 2, c: 3}, ['a', 'd']) // Returns {a: 1}
 * pick({ a: 1, b: 2, c: 3}, []) // Returns {}
 * pick({ a: 1, b: 2, c: { d: 1} }, ['c']) // Returns { c: { d: 1 } }
 */
function pick(source = {}, selected = []) {
  return selected.reduce((obj, key) => source[key] ? ({ ...obj, [key]: source[key] }) : obj, {});
}

/**
 * Picks selected items from the object
 *
 * @param source {Object} Source object
 * @param selection {Array} Keys to select
 * @returns {*|{}}
 * @example
 * pick({ a: 1, b: 2, c: 3}, ['a', 'c']) // Returns {a: 1, c: 3}
 * pick({ a: 1, b: 2, c: 3}, ['a', 'd']) // Returns {a: 1}
 * pick({ a: 1, b: 2, c: 3}, []) // Returns {}
 * pick({ a: 1, b: 2, c: { d: 1} }, ['c']) // Returns { c: { d: 1 } }
 * pick({ a: 1, b: 2, c: 3 }, {'z': 'b', 'a': 'a'}) // Returns { z: 2, a: 1 }
 * pick({ a: 1, b: 2, c: 3 }, [{'z': 'b'}, 'a']) // Returns { z: 2, a: 1 }
 */
function pickModelVariables(source = {}, selection = []) {
  let normalizedSelection = selection;

  // If it's not an array (hopefully, it's an object)
  if (!Array.isArray(selection) && typeof selection === 'object') {
    normalizedSelection = Object.keys(selection).map((k) => ({ [k]: selection[k]}));
  // If it's something else, than array or object, we won't deal with it
  } else if (!Array.isArray(selection)) {
    throw new InvalidArgumentException('Selection should be either array or object.');
  }

  return normalizedSelection.reduce((obj, variable) => {
    let normalizedVariable = variable;
    let normalizedKey = variable;

    // If it's a map
    if (typeof variable === 'object') {
      const keys = Object.keys(variable);

      if (keys.length !== 1) {
        throw new InvalidArgumentException('Variable mapping should be a string or an object with a single key');
      }
      normalizedKey = keys[0];
      normalizedVariable = variable[keys[0]];
    }

    return source[normalizedVariable] !== undefined ? ({ ...obj, [normalizedKey]: source[normalizedVariable] }) : obj;
  }, {});
}

/**
 * Returns a document name of GraphQL document
 *
 * @param document {Object} GQL Document
 * @param callerClass {String} Calling class
 * @returns {String}
 */
function getGQLDocumentName(document, callerClass = 'model class') {
  if (
    !document ||
    !document.definitions ||
    !Array.isArray(document.definitions) ||
    !document.definitions.length
  ) {
    throw new InvalidArgumentException('Invalid GraphQL document specified.');
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
  Object.assign(target, Object.defineProperties(source, Object.getOwnPropertyDescriptors(target)));
}

export {
  isDebug,
  version,
  sortBy,
  pick,
  pickModelVariables,
  defineProperties,
  getGQLDocumentName,
  spawn,
  intersect,
  cloneDeep,
  stripTypename,
  findRecursive,
  findRouteMetas,
};
