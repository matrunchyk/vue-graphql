(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("vue-graphql-models", ["moment", "vue"], factory);
	else if(typeof exports === 'object')
		exports["vue-graphql-models"] = factory(require("moment"), require("vue"));
	else
		root["vue-graphql-models"] = factory(root["moment"], root["vue"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_moment__, __WEBPACK_EXTERNAL_MODULE_vue__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/collect.js/dist/helpers/clone.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/clone.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Clone helper
 *
 * Clone an array or object
 *
 * @param items
 * @returns {*}
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function clone(items) {
  var cloned = void 0;

  if (Array.isArray(items)) {
    var _cloned;

    cloned = [];

    (_cloned = cloned).push.apply(_cloned, _toConsumableArray(items));
  } else {
    cloned = {};

    Object.keys(items).forEach(function (prop) {
      cloned[prop] = items[prop];
    });
  }

  return cloned;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/nestedValue.js":
/*!*************************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/nestedValue.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Get value of a nested property
 *
 * @param mainObject
 * @param key
 * @returns {*}
 */

module.exports = function nestedValue(mainObject, key) {
  try {
    return key.split('.').reduce(function (obj, property) {
      return obj[property];
    }, mainObject);
  } catch (err) {
    return null;
  }
};

/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/values.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/values.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Values helper
 *
 * Retrieve values from [this.items] when it is an array, object or Collection
 *
 * @returns {*}
 * @param items
 */

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function values(items) {
  var valuesArray = [];

  if (Array.isArray(items)) {
    valuesArray.push.apply(valuesArray, _toConsumableArray(items));
  } else if (items.constructor.name === 'Collection') {
    valuesArray.push.apply(valuesArray, _toConsumableArray(items.all()));
  } else {
    Object.keys(items).forEach(function (prop) {
      return valuesArray.push(items[prop]);
    });
  }

  return valuesArray;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/helpers/variadic.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/helpers/variadic.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Variadic helper function
 *
 * @param args
 * @returns {*}
 */

module.exports = function variadic(args) {
  if (Array.isArray(args[0])) {
    return args[0];
  }

  return args;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/collect.js/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Collection(collection) {
  this.items = collection || [];
}

var SymbolIterator = __webpack_require__(/*! ./methods/symbol.iterator */ "./node_modules/collect.js/dist/methods/symbol.iterator.js");

if (typeof Symbol !== 'undefined') {
  Collection.prototype[Symbol.iterator] = SymbolIterator;
}

Collection.prototype.all = __webpack_require__(/*! ./methods/all */ "./node_modules/collect.js/dist/methods/all.js");
Collection.prototype.average = __webpack_require__(/*! ./methods/average */ "./node_modules/collect.js/dist/methods/average.js");
Collection.prototype.avg = __webpack_require__(/*! ./methods/average */ "./node_modules/collect.js/dist/methods/average.js");
Collection.prototype.chunk = __webpack_require__(/*! ./methods/chunk */ "./node_modules/collect.js/dist/methods/chunk.js");
Collection.prototype.collapse = __webpack_require__(/*! ./methods/collapse */ "./node_modules/collect.js/dist/methods/collapse.js");
Collection.prototype.combine = __webpack_require__(/*! ./methods/combine */ "./node_modules/collect.js/dist/methods/combine.js");
Collection.prototype.concat = __webpack_require__(/*! ./methods/concat */ "./node_modules/collect.js/dist/methods/concat.js");
Collection.prototype.contains = __webpack_require__(/*! ./methods/contains */ "./node_modules/collect.js/dist/methods/contains.js");
Collection.prototype.count = __webpack_require__(/*! ./methods/count */ "./node_modules/collect.js/dist/methods/count.js");
Collection.prototype.crossJoin = __webpack_require__(/*! ./methods/crossJoin */ "./node_modules/collect.js/dist/methods/crossJoin.js");
Collection.prototype.dd = __webpack_require__(/*! ./methods/dd */ "./node_modules/collect.js/dist/methods/dd.js");
Collection.prototype.diff = __webpack_require__(/*! ./methods/diff */ "./node_modules/collect.js/dist/methods/diff.js");
Collection.prototype.diffAssoc = __webpack_require__(/*! ./methods/diffAssoc */ "./node_modules/collect.js/dist/methods/diffAssoc.js");
Collection.prototype.diffKeys = __webpack_require__(/*! ./methods/diffKeys */ "./node_modules/collect.js/dist/methods/diffKeys.js");
Collection.prototype.dump = __webpack_require__(/*! ./methods/dump */ "./node_modules/collect.js/dist/methods/dump.js");
Collection.prototype.each = __webpack_require__(/*! ./methods/each */ "./node_modules/collect.js/dist/methods/each.js");
Collection.prototype.eachSpread = __webpack_require__(/*! ./methods/eachSpread */ "./node_modules/collect.js/dist/methods/eachSpread.js");
Collection.prototype.every = __webpack_require__(/*! ./methods/every */ "./node_modules/collect.js/dist/methods/every.js");
Collection.prototype.except = __webpack_require__(/*! ./methods/except */ "./node_modules/collect.js/dist/methods/except.js");
Collection.prototype.filter = __webpack_require__(/*! ./methods/filter */ "./node_modules/collect.js/dist/methods/filter.js");
Collection.prototype.first = __webpack_require__(/*! ./methods/first */ "./node_modules/collect.js/dist/methods/first.js");
Collection.prototype.firstWhere = __webpack_require__(/*! ./methods/firstWhere */ "./node_modules/collect.js/dist/methods/firstWhere.js");
Collection.prototype.flatMap = __webpack_require__(/*! ./methods/flatMap */ "./node_modules/collect.js/dist/methods/flatMap.js");
Collection.prototype.flatten = __webpack_require__(/*! ./methods/flatten */ "./node_modules/collect.js/dist/methods/flatten.js");
Collection.prototype.flip = __webpack_require__(/*! ./methods/flip */ "./node_modules/collect.js/dist/methods/flip.js");
Collection.prototype.forPage = __webpack_require__(/*! ./methods/forPage */ "./node_modules/collect.js/dist/methods/forPage.js");
Collection.prototype.forget = __webpack_require__(/*! ./methods/forget */ "./node_modules/collect.js/dist/methods/forget.js");
Collection.prototype.get = __webpack_require__(/*! ./methods/get */ "./node_modules/collect.js/dist/methods/get.js");
Collection.prototype.groupBy = __webpack_require__(/*! ./methods/groupBy */ "./node_modules/collect.js/dist/methods/groupBy.js");
Collection.prototype.has = __webpack_require__(/*! ./methods/has */ "./node_modules/collect.js/dist/methods/has.js");
Collection.prototype.implode = __webpack_require__(/*! ./methods/implode */ "./node_modules/collect.js/dist/methods/implode.js");
Collection.prototype.intersect = __webpack_require__(/*! ./methods/intersect */ "./node_modules/collect.js/dist/methods/intersect.js");
Collection.prototype.intersectByKeys = __webpack_require__(/*! ./methods/intersectByKeys */ "./node_modules/collect.js/dist/methods/intersectByKeys.js");
Collection.prototype.isEmpty = __webpack_require__(/*! ./methods/isEmpty */ "./node_modules/collect.js/dist/methods/isEmpty.js");
Collection.prototype.isNotEmpty = __webpack_require__(/*! ./methods/isNotEmpty */ "./node_modules/collect.js/dist/methods/isNotEmpty.js");
Collection.prototype.keyBy = __webpack_require__(/*! ./methods/keyBy */ "./node_modules/collect.js/dist/methods/keyBy.js");
Collection.prototype.keys = __webpack_require__(/*! ./methods/keys */ "./node_modules/collect.js/dist/methods/keys.js");
Collection.prototype.last = __webpack_require__(/*! ./methods/last */ "./node_modules/collect.js/dist/methods/last.js");
Collection.prototype.macro = __webpack_require__(/*! ./methods/macro */ "./node_modules/collect.js/dist/methods/macro.js");
Collection.prototype.map = __webpack_require__(/*! ./methods/map */ "./node_modules/collect.js/dist/methods/map.js");
Collection.prototype.mapSpread = __webpack_require__(/*! ./methods/mapSpread */ "./node_modules/collect.js/dist/methods/mapSpread.js");
Collection.prototype.mapToDictionary = __webpack_require__(/*! ./methods/mapToDictionary */ "./node_modules/collect.js/dist/methods/mapToDictionary.js");
Collection.prototype.mapInto = __webpack_require__(/*! ./methods/mapInto */ "./node_modules/collect.js/dist/methods/mapInto.js");
Collection.prototype.mapToGroups = __webpack_require__(/*! ./methods/mapToGroups */ "./node_modules/collect.js/dist/methods/mapToGroups.js");
Collection.prototype.mapWithKeys = __webpack_require__(/*! ./methods/mapWithKeys */ "./node_modules/collect.js/dist/methods/mapWithKeys.js");
Collection.prototype.max = __webpack_require__(/*! ./methods/max */ "./node_modules/collect.js/dist/methods/max.js");
Collection.prototype.median = __webpack_require__(/*! ./methods/median */ "./node_modules/collect.js/dist/methods/median.js");
Collection.prototype.merge = __webpack_require__(/*! ./methods/merge */ "./node_modules/collect.js/dist/methods/merge.js");
Collection.prototype.min = __webpack_require__(/*! ./methods/min */ "./node_modules/collect.js/dist/methods/min.js");
Collection.prototype.mode = __webpack_require__(/*! ./methods/mode */ "./node_modules/collect.js/dist/methods/mode.js");
Collection.prototype.nth = __webpack_require__(/*! ./methods/nth */ "./node_modules/collect.js/dist/methods/nth.js");
Collection.prototype.only = __webpack_require__(/*! ./methods/only */ "./node_modules/collect.js/dist/methods/only.js");
Collection.prototype.pad = __webpack_require__(/*! ./methods/pad */ "./node_modules/collect.js/dist/methods/pad.js");
Collection.prototype.partition = __webpack_require__(/*! ./methods/partition */ "./node_modules/collect.js/dist/methods/partition.js");
Collection.prototype.pipe = __webpack_require__(/*! ./methods/pipe */ "./node_modules/collect.js/dist/methods/pipe.js");
Collection.prototype.pluck = __webpack_require__(/*! ./methods/pluck */ "./node_modules/collect.js/dist/methods/pluck.js");
Collection.prototype.pop = __webpack_require__(/*! ./methods/pop */ "./node_modules/collect.js/dist/methods/pop.js");
Collection.prototype.prepend = __webpack_require__(/*! ./methods/prepend */ "./node_modules/collect.js/dist/methods/prepend.js");
Collection.prototype.pull = __webpack_require__(/*! ./methods/pull */ "./node_modules/collect.js/dist/methods/pull.js");
Collection.prototype.push = __webpack_require__(/*! ./methods/push */ "./node_modules/collect.js/dist/methods/push.js");
Collection.prototype.put = __webpack_require__(/*! ./methods/put */ "./node_modules/collect.js/dist/methods/put.js");
Collection.prototype.random = __webpack_require__(/*! ./methods/random */ "./node_modules/collect.js/dist/methods/random.js");
Collection.prototype.reduce = __webpack_require__(/*! ./methods/reduce */ "./node_modules/collect.js/dist/methods/reduce.js");
Collection.prototype.reject = __webpack_require__(/*! ./methods/reject */ "./node_modules/collect.js/dist/methods/reject.js");
Collection.prototype.reverse = __webpack_require__(/*! ./methods/reverse */ "./node_modules/collect.js/dist/methods/reverse.js");
Collection.prototype.search = __webpack_require__(/*! ./methods/search */ "./node_modules/collect.js/dist/methods/search.js");
Collection.prototype.shift = __webpack_require__(/*! ./methods/shift */ "./node_modules/collect.js/dist/methods/shift.js");
Collection.prototype.shuffle = __webpack_require__(/*! ./methods/shuffle */ "./node_modules/collect.js/dist/methods/shuffle.js");
Collection.prototype.slice = __webpack_require__(/*! ./methods/slice */ "./node_modules/collect.js/dist/methods/slice.js");
Collection.prototype.sort = __webpack_require__(/*! ./methods/sort */ "./node_modules/collect.js/dist/methods/sort.js");
Collection.prototype.sortBy = __webpack_require__(/*! ./methods/sortBy */ "./node_modules/collect.js/dist/methods/sortBy.js");
Collection.prototype.sortByDesc = __webpack_require__(/*! ./methods/sortByDesc */ "./node_modules/collect.js/dist/methods/sortByDesc.js");
Collection.prototype.splice = __webpack_require__(/*! ./methods/splice */ "./node_modules/collect.js/dist/methods/splice.js");
Collection.prototype.split = __webpack_require__(/*! ./methods/split */ "./node_modules/collect.js/dist/methods/split.js");
Collection.prototype.sum = __webpack_require__(/*! ./methods/sum */ "./node_modules/collect.js/dist/methods/sum.js");
Collection.prototype.take = __webpack_require__(/*! ./methods/take */ "./node_modules/collect.js/dist/methods/take.js");
Collection.prototype.tap = __webpack_require__(/*! ./methods/tap */ "./node_modules/collect.js/dist/methods/tap.js");
Collection.prototype.times = __webpack_require__(/*! ./methods/times */ "./node_modules/collect.js/dist/methods/times.js");
Collection.prototype.toArray = __webpack_require__(/*! ./methods/toArray */ "./node_modules/collect.js/dist/methods/toArray.js");
Collection.prototype.toJson = __webpack_require__(/*! ./methods/toJson */ "./node_modules/collect.js/dist/methods/toJson.js");
Collection.prototype.transform = __webpack_require__(/*! ./methods/transform */ "./node_modules/collect.js/dist/methods/transform.js");
Collection.prototype.unless = __webpack_require__(/*! ./methods/unless */ "./node_modules/collect.js/dist/methods/unless.js");
Collection.prototype.union = __webpack_require__(/*! ./methods/union */ "./node_modules/collect.js/dist/methods/union.js");
Collection.prototype.unique = __webpack_require__(/*! ./methods/unique */ "./node_modules/collect.js/dist/methods/unique.js");
Collection.prototype.unwrap = __webpack_require__(/*! ./methods/unwrap */ "./node_modules/collect.js/dist/methods/unwrap.js");
Collection.prototype.values = __webpack_require__(/*! ./methods/values */ "./node_modules/collect.js/dist/methods/values.js");
Collection.prototype.when = __webpack_require__(/*! ./methods/when */ "./node_modules/collect.js/dist/methods/when.js");
Collection.prototype.where = __webpack_require__(/*! ./methods/where */ "./node_modules/collect.js/dist/methods/where.js");
Collection.prototype.whereIn = __webpack_require__(/*! ./methods/whereIn */ "./node_modules/collect.js/dist/methods/whereIn.js");
Collection.prototype.whereNotIn = __webpack_require__(/*! ./methods/whereNotIn */ "./node_modules/collect.js/dist/methods/whereNotIn.js");
Collection.prototype.wrap = __webpack_require__(/*! ./methods/wrap */ "./node_modules/collect.js/dist/methods/wrap.js");
Collection.prototype.zip = __webpack_require__(/*! ./methods/zip */ "./node_modules/collect.js/dist/methods/zip.js");

var collect = function collect(collection) {
  return new Collection(collection);
};

module.exports = collect;
module.exports.default = collect;

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/all.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/all.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function all() {
  return this.items;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/average.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/average.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function average(key) {
  if (key === undefined) {
    return this.sum() / this.items.length;
  }

  return new this.constructor(this.items).pluck(key).sum() / this.items.length;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/chunk.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/chunk.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function chunk(size) {
  var _this = this;

  var chunks = [];
  var index = 0;

  if (Array.isArray(this.items)) {
    do {
      var items = this.items.slice(index, index + size);
      var collection = new this.constructor(items);

      chunks.push(collection);
      index += size;
    } while (index < this.items.length);
  } else if (_typeof(this.items) === 'object') {
    var keys = Object.keys(this.items);

    var _loop = function _loop() {
      var keysOfChunk = keys.slice(index, index + size);
      var collection = new _this.constructor({});

      keysOfChunk.forEach(function (key) {
        return collection.put(key, _this.items[key]);
      });

      chunks.push(collection);
      index += size;
    };

    do {
      _loop();
    } while (index < keys.length);
  } else {
    chunks.push(new this.constructor([this.items]));
  }

  return new this.constructor(chunks);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/collapse.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/collapse.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function collapse() {
  var _ref;

  return new this.constructor((_ref = []).concat.apply(_ref, _toConsumableArray(this.items)));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/combine.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/combine.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function combine(array) {
  var _this = this;

  var values = array;

  if (values instanceof this.constructor) {
    values = array.all();
  }

  var collection = {};

  if (Array.isArray(this.items) && Array.isArray(values)) {
    this.items.forEach(function (key, iterator) {
      collection[key] = values[iterator];
    });
  } else if (_typeof(this.items) === 'object' && (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === 'object') {
    Object.keys(this.items).forEach(function (key, index) {
      collection[_this.items[key]] = values[Object.keys(values)[index]];
    });
  } else if (Array.isArray(this.items)) {
    collection[this.items[0]] = values;
  } else if (typeof this.items === 'string' && Array.isArray(values)) {
    collection[this.items] = values[0];
  } else if (typeof this.items === 'string') {
    collection[this.items] = values;
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/concat.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/concat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function concat(collectionOrArrayOrObject) {
  var _this = this;

  var list = collectionOrArrayOrObject;

  if (collectionOrArrayOrObject instanceof this.constructor) {
    list = collectionOrArrayOrObject.all();
  } else if ((typeof collectionOrArrayOrObject === 'undefined' ? 'undefined' : _typeof(collectionOrArrayOrObject)) === 'object') {
    list = [];
    Object.keys(collectionOrArrayOrObject).forEach(function (property) {
      list.push(collectionOrArrayOrObject[property]);
    });
  }

  list.forEach(function (item) {
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
      Object.keys(item).forEach(function (key) {
        return _this.items.push(item[key]);
      });
    } else {
      _this.items.push(item);
    }
  });

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/contains.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/contains.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function contains(key, value) {
  if (value !== undefined) {
    if (Array.isArray(this.items)) {
      return this.items.filter(function (items) {
        return items[key] !== undefined && items[key] === value;
      }).length > 0;
    }

    return this.items[key] !== undefined && this.items[key] === value;
  }

  if (typeof key === 'function') {
    return this.items.filter(function (item, index) {
      return key(item, index);
    }).length > 0;
  }

  if (Array.isArray(this.items)) {
    return this.items.indexOf(key) !== -1;
  }

  var keysAndValues = values(this.items);
  keysAndValues.push.apply(keysAndValues, _toConsumableArray(Object.keys(this.items)));

  return keysAndValues.indexOf(key) !== -1;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/count.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/count.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function count() {
  var arrayLength = 0;

  if (Array.isArray(this.items)) {
    arrayLength = this.items.length;
  }

  return Math.max(Object.keys(this.items).length, arrayLength);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/crossJoin.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/crossJoin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function crossJoin() {
  function join(collection, constructor, args) {
    var current = args[0];

    if (current instanceof constructor) {
      current = current.all();
    }

    var rest = args.slice(1);
    var last = !rest.length;
    var result = [];

    for (var i = 0; i < current.length; i += 1) {
      var collectionCopy = collection.slice();
      collectionCopy.push(current[i]);

      if (last) {
        result.push(collectionCopy);
      } else {
        result = result.concat(join(collectionCopy, constructor, rest));
      }
    }

    return result;
  }

  for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return new this.constructor(join([], this.constructor, [].concat([this.items], values)));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/dd.js":
/*!****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/dd.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = function dd() {
  this.dump();

  if (typeof process !== 'undefined') {
    process.exit(1);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/diff.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/diff.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function diff(values) {
  var valuesToDiff = void 0;

  if (values instanceof this.constructor) {
    valuesToDiff = values.all();
  } else {
    valuesToDiff = values;
  }

  var collection = this.items.filter(function (item) {
    return valuesToDiff.indexOf(item) === -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/diffAssoc.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/diffAssoc.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function diffAssoc(values) {
  var _this = this;

  var diffValues = values;

  if (values instanceof this.constructor) {
    diffValues = values.all();
  }

  var collection = {};

  Object.keys(this.items).forEach(function (key) {
    if (diffValues[key] === undefined || diffValues[key] !== _this.items[key]) {
      collection[key] = _this.items[key];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/diffKeys.js":
/*!**********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/diffKeys.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function diffKeys(object) {
  var objectToDiff = void 0;

  if (object instanceof this.constructor) {
    objectToDiff = object.all();
  } else {
    objectToDiff = object;
  }

  var objectKeys = Object.keys(objectToDiff);

  var remainingKeys = Object.keys(this.items).filter(function (item) {
    return objectKeys.indexOf(item) === -1;
  });

  return new this.constructor(this.items).only(remainingKeys);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/dump.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/dump.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function dump() {
  // eslint-disable-next-line
  console.log(this);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/each.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/each.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function each(fn) {
  var _this = this;

  if (Array.isArray(this.items)) {
    this.items.forEach(fn);
  } else {
    Object.keys(this.items).forEach(function (key) {
      fn(_this.items[key], key, _this.items);
    });
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/eachSpread.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/eachSpread.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function eachSpread(fn) {
  this.each(function (values, key) {
    fn.apply(undefined, _toConsumableArray(values).concat([key]));
  });

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/every.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/every.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function every(fn) {
  var items = values(this.items);

  return items.map(function (item, index) {
    return fn(item, index);
  }).indexOf(false) === -1;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/except.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/except.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var variadic = __webpack_require__(/*! ../helpers/variadic */ "./node_modules/collect.js/dist/helpers/variadic.js");

module.exports = function except() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var properties = variadic(args);

  if (Array.isArray(this.items)) {
    var _collection = this.items.filter(function (item) {
      return properties.indexOf(item) === -1;
    });

    return new this.constructor(_collection);
  }

  var collection = {};

  Object.keys(this.items).forEach(function (property) {
    if (properties.indexOf(property) === -1) {
      collection[property] = _this.items[property];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/filter.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/filter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function falsyValue(item) {
  if (Array.isArray(item)) {
    if (item.length) {
      return false;
    }
  } else if (item !== undefined && item !== null && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
    if (Object.keys(item).length) {
      return false;
    }
  } else if (item) {
    return false;
  }

  return true;
}

function filterObject(func, items) {
  var result = {};
  Object.keys(items).forEach(function (key) {
    if (func) {
      if (func(items[key], key)) {
        result[key] = items[key];
      }
    } else if (!falsyValue(items[key])) {
      result[key] = items[key];
    }
  });

  return result;
}

function filterArray(func, items) {
  if (func) {
    return items.filter(func);
  }
  var result = [];
  for (var i = 0; i < items.length; i += 1) {
    var item = items[i];
    if (!falsyValue(item)) {
      result.push(item);
    }
  }

  return result;
}

module.exports = function filter(fn) {
  var func = fn || false;
  var filteredItems = null;
  if (Array.isArray(this.items)) {
    filteredItems = filterArray(func, this.items);
  } else {
    filteredItems = filterObject(func, this.items);
  }

  return new this.constructor(filteredItems);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/first.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/first.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function first(fn, defaultValue) {
  if (typeof fn === 'function') {
    for (var i = 0, length = this.items.length; i < length; i += 1) {
      var item = this.items[i];
      if (fn(item)) {
        return item;
      }
    }

    if (typeof defaultValue === 'function') {
      return defaultValue();
    }

    return defaultValue;
  }

  if (Array.isArray(this.items) && this.items.length || Object.keys(this.items).length) {
    if (Array.isArray(this.items)) {
      return this.items[0];
    }

    var firstKey = Object.keys(this.items)[0];

    return this.items[firstKey];
  }

  if (typeof defaultValue === 'function') {
    return defaultValue();
  }

  return defaultValue;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/firstWhere.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/firstWhere.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function firstWhere(key, value) {
  return this.where(key, value).first() || null;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/flatMap.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/flatMap.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function flatMap(fn) {
  var items = [];

  this.items.forEach(function (childObject, index) {
    var keys = Object.keys(childObject);
    var values = [];

    keys.forEach(function (prop) {
      values.push(childObject[prop]);
    });

    var mapped = fn(values, index);

    var collection = {};

    keys.forEach(function (key, i) {
      collection[key] = mapped[i];
    });

    items.push(collection);
  });

  return new this.constructor(Object.assign.apply(Object, items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/flatten.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/flatten.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function flatten(depth) {
  var flattenDepth = depth || Infinity;

  var fullyFlattened = false;
  var collection = [];

  var flat = function flat(items) {
    collection = [];

    if (Array.isArray(items)) {
      items.forEach(function (item) {
        if (typeof item === 'string') {
          collection.push(item);
        } else if (Array.isArray(item)) {
          collection = collection.concat(item);
        } else {
          Object.keys(item).forEach(function (property) {
            collection = collection.concat(item[property]);
          });
        }
      });
    } else {
      Object.keys(items).forEach(function (property) {
        if (typeof items[property] === 'string') {
          collection.push(items[property]);
        } else if (Array.isArray(items[property])) {
          collection = collection.concat(items[property]);
        } else {
          Object.keys(items).forEach(function (prop) {
            collection = collection.concat(items[prop]);
          });
        }
      });
    }

    fullyFlattened = collection.filter(function (item) {
      return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object';
    });
    fullyFlattened = fullyFlattened.length === 0;

    flattenDepth -= 1;
  };

  flat(this.items);

  while (!fullyFlattened && flattenDepth > 0) {
    flat(collection);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/flip.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/flip.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function flip() {
  var _this = this;

  var collection = {};

  if (Array.isArray(this.items)) {
    Object.keys(this.items).forEach(function (key) {
      collection[_this.items[key]] = Number(key);
    });
  } else {
    Object.keys(this.items).forEach(function (key) {
      collection[_this.items[key]] = key;
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/forPage.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/forPage.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function forPage(page, chunk) {
  var _this = this;

  var collection = {};

  if (Array.isArray(this.items)) {
    collection = this.items.slice(page * chunk - chunk, page * chunk);
  } else {
    Object.keys(this.items).slice(page * chunk - chunk, page * chunk).forEach(function (key) {
      collection[key] = _this.items[key];
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/forget.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/forget.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function forget(key) {
  if (Array.isArray(this.items)) {
    this.items.splice(key, 1);
  } else {
    delete this.items[key];
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/get.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/get.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function get(key) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (this.items[key] !== undefined) {
    return this.items[key];
  }

  if (typeof defaultValue === 'function') {
    return defaultValue();
  }

  if (defaultValue !== null) {
    return defaultValue;
  }

  return null;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/groupBy.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/groupBy.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function groupBy(key) {
  var _this = this;

  var collection = {};

  this.items.forEach(function (item, index) {
    var resolvedKey = void 0;

    if (typeof key === 'function') {
      resolvedKey = key(item, index);
    } else {
      resolvedKey = item[key] || '';
    }

    if (collection[resolvedKey] === undefined) {
      collection[resolvedKey] = new _this.constructor([]);
    }

    collection[resolvedKey].push(item);
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/has.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/has.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var variadic = __webpack_require__(/*! ../helpers/variadic */ "./node_modules/collect.js/dist/helpers/variadic.js");

module.exports = function has() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var properties = variadic(args);

  return properties.filter(function (key) {
    return _this.items[key];
  }).length === properties.length;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/implode.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/implode.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function implode(key, glue) {
  if (glue === undefined) {
    return this.items.join(key);
  }

  return new this.constructor(this.items).pluck(key).all().join(glue);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/intersect.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/intersect.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function intersect(values) {
  var intersectValues = values;

  if (values instanceof this.constructor) {
    intersectValues = values.all();
  }

  var collection = this.items.filter(function (item) {
    return intersectValues.indexOf(item) !== -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/intersectByKeys.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/intersectByKeys.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function intersectByKeys(values) {
  var _this = this;

  var intersectKeys = Object.keys(values);

  if (values instanceof this.constructor) {
    intersectKeys = Object.keys(values.all());
  }

  var collection = {};

  Object.keys(this.items).forEach(function (key) {
    if (intersectKeys.indexOf(key) !== -1) {
      collection[key] = _this.items[key];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/isEmpty.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/isEmpty.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isEmpty() {
  return !this.items.length;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/isNotEmpty.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/isNotEmpty.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isNotEmpty() {
  return !!this.items.length;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/keyBy.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/keyBy.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function keyBy(key) {
  var collection = {};

  if (typeof key === 'function') {
    this.items.forEach(function (item) {
      collection[key(item)] = item;
    });
  } else {
    this.items.forEach(function (item) {
      collection[item[key] || ''] = item;
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/keys.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function keys() {
  var collection = Object.keys(this.items);

  if (Array.isArray(this.items)) {
    collection = collection.map(Number);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/last.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/last.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function last(fn, defaultValue) {
  var items = this.items;

  if (typeof fn === 'function') {
    items = this.filter(fn).all();
  }

  if (Array.isArray(items) && !items.length || !Object.keys(items).length) {
    if (typeof defaultValue === 'function') {
      return defaultValue();
    }

    return defaultValue;
  }

  if (Array.isArray(items)) {
    return items[items.length - 1];
  }
  var keys = Object.keys(items);

  return items[keys[keys.length - 1]];
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/macro.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/macro.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function macro(name, fn) {
  this.constructor.prototype[name] = fn;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/map.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/map.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function map(fn) {
  var _this = this;

  if (Array.isArray(this.items)) {
    return new this.constructor(this.items.map(fn));
  }

  var collection = {};

  Object.keys(this.items).forEach(function (key) {
    collection[key] = fn(_this.items[key], key);
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapInto.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapInto.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mapInto(ClassName) {
  return this.map(function (value, key) {
    return new ClassName(value, key);
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapSpread.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapSpread.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function mapSpread(fn) {
  return this.map(function (values, key) {
    return fn.apply(undefined, _toConsumableArray(values).concat([key]));
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapToDictionary.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapToDictionary.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function mapToDictionary(fn) {
  var collection = {};

  this.items.forEach(function (item, k) {
    var _fn = fn(item, k),
        _fn2 = _slicedToArray(_fn, 2),
        key = _fn2[0],
        value = _fn2[1];

    if (collection[key] === undefined) {
      collection[key] = [value];
    } else {
      collection[key].push(value);
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapToGroups.js":
/*!*************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapToGroups.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function mapToGroups(fn) {
  var collection = {};

  this.items.forEach(function (item, key) {
    var _fn = fn(item, key),
        _fn2 = _slicedToArray(_fn, 2),
        keyed = _fn2[0],
        value = _fn2[1];

    if (collection[keyed] === undefined) {
      collection[keyed] = [value];
    } else {
      collection[keyed].push(value);
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mapWithKeys.js":
/*!*************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mapWithKeys.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function mapWithKeys(fn) {
  var _this = this;

  var collection = {};

  if (Array.isArray(this.items)) {
    this.items.forEach(function (item) {
      var _fn = fn(item),
          _fn2 = _slicedToArray(_fn, 2),
          keyed = _fn2[0],
          value = _fn2[1];

      collection[keyed] = value;
    });
  } else {
    Object.keys(this.items).forEach(function (key) {
      var _fn3 = fn(_this.items[key]),
          _fn4 = _slicedToArray(_fn3, 2),
          keyed = _fn4[0],
          value = _fn4[1];

      collection[keyed] = value;
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/max.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/max.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function max(key) {
  if (typeof key === 'string') {
    return Math.max.apply(Math, _toConsumableArray(this.pluck(key).all()));
  }

  return Math.max.apply(Math, _toConsumableArray(this.items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/median.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/median.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function median(key) {
  var length = this.items.length;

  if (key === undefined) {
    if (length % 2 === 0) {
      return (this.items[length / 2 - 1] + this.items[length / 2]) / 2;
    }

    return this.items[Math.floor(length / 2)];
  }

  if (length % 2 === 0) {
    return (this.items[length / 2 - 1][key] + this.items[length / 2][key]) / 2;
  }

  return this.items[Math.floor(length / 2)][key];
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/merge.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/merge.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function merge(value) {
  var arrayOrObject = value;

  if (typeof arrayOrObject === 'string') {
    arrayOrObject = [arrayOrObject];
  }

  if (Array.isArray(this.items) && Array.isArray(arrayOrObject)) {
    return new this.constructor(this.items.concat(arrayOrObject));
  }

  var collection = JSON.parse(JSON.stringify(this.items));

  Object.keys(arrayOrObject).forEach(function (key) {
    collection[key] = arrayOrObject[key];
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/min.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/min.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function min(key) {
  if (key !== undefined) {
    return Math.min.apply(Math, _toConsumableArray(this.pluck(key).all()));
  }

  return Math.min.apply(Math, _toConsumableArray(this.items));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/mode.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/mode.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mode(key) {
  var values = [];
  var highestCount = 1;

  if (!this.items.length) {
    return null;
  }

  this.items.forEach(function (item) {
    var tempValues = values.filter(function (value) {
      if (key !== undefined) {
        return value.key === item[key];
      }

      return value.key === item;
    });

    if (!tempValues.length) {
      if (key !== undefined) {
        values.push({ key: item[key], count: 1 });
      } else {
        values.push({ key: item, count: 1 });
      }
    } else {
      tempValues[0].count += 1;
      var count = tempValues[0].count;

      if (count > highestCount) {
        highestCount = count;
      }
    }
  });

  return values.filter(function (value) {
    return value.count === highestCount;
  }).map(function (value) {
    return value.key;
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/nth.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/nth.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function nth(n) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var items = values(this.items);

  var collection = items.slice(offset).filter(function (item, index) {
    return index % n === 0;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/only.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/only.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var variadic = __webpack_require__(/*! ../helpers/variadic */ "./node_modules/collect.js/dist/helpers/variadic.js");

module.exports = function only() {
  var _this = this;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var properties = variadic(args);

  if (Array.isArray(this.items)) {
    var _collection = this.items.filter(function (item) {
      return properties.indexOf(item) !== -1;
    });

    return new this.constructor(_collection);
  }

  var collection = {};

  Object.keys(this.items).forEach(function (prop) {
    if (properties.indexOf(prop) !== -1) {
      collection[prop] = _this.items[prop];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pad.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pad.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clone = __webpack_require__(/*! ../helpers/clone */ "./node_modules/collect.js/dist/helpers/clone.js");

module.exports = function pad(size, value) {
  var abs = Math.abs(size);
  var count = this.count();

  if (abs <= count) {
    return this;
  }

  var diff = abs - count;
  var items = clone(this.items);
  var isArray = Array.isArray(this.items);
  var prepend = size < 0;

  for (var iterator = 0; iterator < diff;) {
    if (!isArray) {
      if (items[iterator] !== undefined) {
        diff += 1;
      } else {
        items[iterator] = value;
      }
    } else if (prepend) {
      items.unshift(value);
    } else {
      items.push(value);
    }

    iterator += 1;
  }

  return new this.constructor(items);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/partition.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/partition.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function partition(fn) {
  var _this = this;

  var arrays = void 0;

  if (Array.isArray(this.items)) {
    arrays = [new this.constructor([]), new this.constructor([])];

    this.items.forEach(function (item) {
      if (fn(item) === true) {
        arrays[0].push(item);
      } else {
        arrays[1].push(item);
      }
    });
  } else {
    arrays = [new this.constructor({}), new this.constructor({})];

    Object.keys(this.items).forEach(function (prop) {
      var value = _this.items[prop];

      if (fn(value) === true) {
        arrays[0].put(prop, value);
      } else {
        arrays[1].put(prop, value);
      }
    });
  }

  return new this.constructor(arrays);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pipe.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pipe.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function pipe(fn) {
  return fn(this);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pluck.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pluck.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

var buildKeyPathMap = function buildKeyPathMap(items) {
  var keyPaths = {};

  items.forEach(function (item, index) {
    function buildKeyPath(val, keyPath) {
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
        Object.keys(val).forEach(function (prop) {
          buildKeyPath(val[prop], keyPath + '.' + prop);
        });
      }

      keyPaths[keyPath] = val;
    }

    buildKeyPath(item, index);
  });

  return keyPaths;
};

module.exports = function pluck(value, key) {
  if (value.indexOf('*') !== -1) {
    var keyPathMap = buildKeyPathMap(this.items);

    var keyMatches = [];

    if (key !== undefined) {
      var keyRegex = new RegExp('0.' + key, 'g');
      var keyNumberOfLevels = ('0.' + key).split('.').length;

      Object.keys(keyPathMap).forEach(function (k) {
        var matchingKey = k.match(keyRegex);

        if (matchingKey) {
          var match = matchingKey[0];

          if (match.split('.').length === keyNumberOfLevels) {
            keyMatches.push(keyPathMap[match]);
          }
        }
      });
    }

    var valueMatches = [];
    var valueRegex = new RegExp('0.' + value, 'g');
    var valueNumberOfLevels = ('0.' + value).split('.').length;

    Object.keys(keyPathMap).forEach(function (k) {
      var matchingValue = k.match(valueRegex);

      if (matchingValue) {
        var match = matchingValue[0];

        if (match.split('.').length === valueNumberOfLevels) {
          valueMatches.push(keyPathMap[match]);
        }
      }
    });

    if (key !== undefined) {
      var collection = {};

      this.items.forEach(function (item, index) {
        collection[keyMatches[index] || ''] = valueMatches;
      });

      return new this.constructor(collection);
    }

    return new this.constructor([valueMatches]);
  }

  if (key !== undefined) {
    var _collection = {};

    this.items.forEach(function (item) {
      if (nestedValue(item, value) !== undefined) {
        _collection[item[key] || ''] = nestedValue(item, value);
      } else {
        _collection[item[key] || ''] = null;
      }
    });

    return new this.constructor(_collection);
  }

  return this.map(function (item) {
    if (nestedValue(item, value) !== undefined) {
      return nestedValue(item, value);
    }

    return null;
  });
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pop.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pop.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function pop() {
  if (Array.isArray(this.items)) {
    return this.items.pop();
  }

  var keys = Object.keys(this.items);
  var key = keys[keys.length - 1];
  var last = this.items[key];

  delete this.items[key];

  return last;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/prepend.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/prepend.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function prepend(value, key) {
  if (key !== undefined) {
    return this.put(key, value);
  }

  this.items.unshift(value);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/pull.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/pull.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function pull(key, defaultValue) {
  var returnValue = this.items[key] || null;

  if (!returnValue && defaultValue !== undefined) {
    if (typeof defaultValue === 'function') {
      returnValue = defaultValue();
    } else {
      returnValue = defaultValue;
    }
  }

  delete this.items[key];

  return returnValue;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/push.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/push.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function push() {
  var _items;

  (_items = this.items).push.apply(_items, arguments);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/put.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/put.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function put(key, value) {
  this.items[key] = value;

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/random.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/random.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function random() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var items = values(this.items);

  var collection = new this.constructor(items).shuffle();

  if (length === 1) {
    return collection.first();
  }

  return collection.take(length);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/reduce.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/reduce.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function reduce(fn, carry) {
  var _this = this;

  var reduceCarry = null;

  if (carry !== undefined) {
    reduceCarry = carry;
  }

  if (Array.isArray(this.items)) {
    this.items.forEach(function (item) {
      reduceCarry = fn(reduceCarry, item);
    });
  } else {
    Object.keys(this.items).forEach(function (key) {
      reduceCarry = fn(reduceCarry, _this.items[key], key);
    });
  }

  return reduceCarry;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/reject.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/reject.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function reject(fn) {
  return new this.constructor(this.items.filter(function (item) {
    return !fn(item);
  }));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/reverse.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/reverse.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function reverse() {
  var collection = [].concat(this.items).reverse();

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/search.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/search.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function search(valueOrFunction, strict) {
  var _this = this;

  var valueFn = valueOrFunction;

  if (typeof valueOrFunction === 'function') {
    valueFn = this.items.filter(function (value, key) {
      return valueOrFunction(value, key);
    })[0];
  }

  var index = false;

  if (Array.isArray(this.items)) {
    var itemKey = this.items.filter(function (item) {
      if (strict === true) {
        return item === valueFn;
      }

      return item === Number(valueFn) || item === valueFn.toString();
    })[0];

    index = this.items.indexOf(itemKey);
  } else {
    return Object.keys(this.items).filter(function (prop) {
      if (strict === true) {
        return _this.items[prop] === valueFn;
      }

      return _this.items[prop] === Number(valueFn) || _this.items[prop] === valueFn.toString();
    })[0] || false;
  }

  if (index === -1) {
    return false;
  }

  return index;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/shift.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/shift.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function shift() {
  if (Array.isArray(this.items)) {
    return this.items.shift();
  }

  var key = Object.keys(this.items)[0];
  var value = this.items[key] || null;
  delete this.items[key];

  return value;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/shuffle.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/shuffle.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");

module.exports = function shuffle() {
  var items = values(this.items);

  var j = void 0;
  var x = void 0;
  var i = void 0;

  for (i = items.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = items[i - 1];
    items[i - 1] = items[j];
    items[j] = x;
  }

  this.items = items;

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/slice.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/slice.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function slice(remove, limit) {
  var collection = this.items.slice(remove);

  if (limit !== undefined) {
    collection = collection.slice(0, limit);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sort.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sort.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sort(fn) {
  var collection = [].concat(this.items);

  if (fn === undefined) {
    if (this.every(function (item) {
      return typeof item === 'number';
    })) {
      collection.sort(function (a, b) {
        return a - b;
      });
    } else {
      collection.sort();
    }
  } else {
    collection.sort(fn);
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sortBy.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sortBy.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sortBy(valueOrFunction) {
  var collection = [].concat(this.items);

  if (typeof valueOrFunction === 'function') {
    collection.sort(function (a, b) {
      if (valueOrFunction(a) < valueOrFunction(b)) return -1;
      if (valueOrFunction(a) > valueOrFunction(b)) return 1;

      return 0;
    });
  } else {
    collection.sort(function (a, b) {
      if (a[valueOrFunction] < b[valueOrFunction]) return -1;
      if (a[valueOrFunction] > b[valueOrFunction]) return 1;

      return 0;
    });
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sortByDesc.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sortByDesc.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sortByDesc(valueOrFunction) {
  return this.sortBy(valueOrFunction).reverse();
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/splice.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/splice.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function splice(index, limit, replace) {
  var slicedCollection = this.slice(index, limit);

  this.items = this.diff(slicedCollection.all()).all();

  if (Array.isArray(replace)) {
    for (var iterator = 0, length = replace.length; iterator < length; iterator += 1) {
      this.items.splice(index + iterator, 0, replace[iterator]);
    }
  }

  return slicedCollection;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/split.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/split.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function split(numberOfGroups) {
  var itemsPerGroup = Math.round(this.items.length / numberOfGroups);

  var items = JSON.parse(JSON.stringify(this.items));
  var collection = [];

  for (var iterator = 0; iterator < numberOfGroups; iterator += 1) {
    collection.push(new this.constructor(items.splice(0, itemsPerGroup)));
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/sum.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/sum.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sum(key) {
  var total = 0;

  if (key === undefined) {
    for (var i = 0, length = this.items.length; i < length; i += 1) {
      total += this.items[i];
    }
  } else if (typeof key === 'function') {
    for (var _i = 0, _length = this.items.length; _i < _length; _i += 1) {
      total += key(this.items[_i]);
    }
  } else {
    for (var _i2 = 0, _length2 = this.items.length; _i2 < _length2; _i2 += 1) {
      total += this.items[_i2][key];
    }
  }

  return total;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/symbol.iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/symbol.iterator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function SymbolIterator() {
  var _this = this;

  var index = -1;

  return {
    next: function next() {
      index += 1;

      return {
        value: _this.items[index],
        done: index >= _this.items.length
      };
    }
  };
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/take.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/take.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function take(length) {
  var _this = this;

  if (!Array.isArray(this.items) && _typeof(this.items) === 'object') {
    var keys = Object.keys(this.items);
    var slicedKeys = void 0;

    if (length < 0) {
      slicedKeys = keys.slice(length);
    } else {
      slicedKeys = keys.slice(0, length);
    }

    var collection = {};

    keys.forEach(function (prop) {
      if (slicedKeys.indexOf(prop) !== -1) {
        collection[prop] = _this.items[prop];
      }
    });

    return new this.constructor(collection);
  }

  if (length < 0) {
    return new this.constructor(this.items.slice(length));
  }

  return new this.constructor(this.items.slice(0, length));
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/tap.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/tap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function tap(fn) {
  fn(this);

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/times.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/times.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function times(n, fn) {
  for (var iterator = 1; iterator <= n; iterator += 1) {
    this.items.push(fn(iterator));
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/toArray.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/toArray.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function toArray() {
  var collectionInstance = this.constructor;

  function iterate(list, collection) {
    var childCollection = [];

    if (list instanceof collectionInstance) {
      list.items.forEach(function (i) {
        return iterate(i, childCollection);
      });
      collection.push(childCollection);
    } else if (Array.isArray(list)) {
      list.forEach(function (i) {
        return iterate(i, childCollection);
      });
      collection.push(childCollection);
    } else {
      collection.push(list);
    }
  }

  if (Array.isArray(this.items)) {
    var collection = [];

    this.items.forEach(function (items) {
      iterate(items, collection);
    });

    return collection;
  }

  return this.values().all();
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/toJson.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/toJson.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function toJson() {
  if (_typeof(this.items) === 'object' && !Array.isArray(this.items)) {
    return JSON.stringify(this.all());
  }

  return JSON.stringify(this.toArray());
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/transform.js":
/*!***********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/transform.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function transform(fn) {
  var _this = this;

  if (Array.isArray(this.items)) {
    this.items = this.items.map(fn);
  } else {
    var collection = {};

    Object.keys(this.items).forEach(function (key) {
      collection[key] = fn(_this.items[key], key);
    });

    this.items = collection;
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/union.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/union.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function union(object) {
  var _this = this;

  var collection = JSON.parse(JSON.stringify(this.items));

  Object.keys(object).forEach(function (prop) {
    if (_this.items[prop] === undefined) {
      collection[prop] = object[prop];
    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/unique.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/unique.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function unique(key) {
  var collection = void 0;

  if (key === undefined) {
    collection = this.items.filter(function (element, index, self) {
      return self.indexOf(element) === index;
    });
  } else {
    collection = [];

    var usedKeys = [];

    for (var iterator = 0, length = this.items.length; iterator < length; iterator += 1) {
      var uniqueKey = void 0;
      if (typeof key === 'function') {
        uniqueKey = key(this.items[iterator]);
      } else {
        uniqueKey = this.items[iterator][key];
      }

      if (usedKeys.indexOf(uniqueKey) === -1) {
        collection.push(this.items[iterator]);
        usedKeys.push(uniqueKey);
      }
    }
  }

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/unless.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/unless.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function when(value, fn, defaultFn) {
  if (!value) {
    fn(this);
  } else {
    defaultFn(this);
  }
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/unwrap.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/unwrap.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function unwrap(value) {
  if (value instanceof this.constructor) {
    return value.all();
  }

  return value;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/values.js":
/*!********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/values.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function values() {
  var _this = this;

  var collection = [];

  Object.keys(this.items).forEach(function (property) {
    collection.push(_this.items[property]);
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/when.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/when.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function when(value, fn, defaultFn) {
  if (value) {
    return fn(this, value);
  } else if (defaultFn) {
    return defaultFn(this, value);
  }

  return this;
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/where.js":
/*!*******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/where.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var values = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");
var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

module.exports = function where(key, operator, value) {
  var comparisonOperator = operator;
  var comparisonValue = value;

  if (value === undefined) {
    comparisonValue = operator;
    comparisonOperator = '===';
  }

  var items = values(this.items);

  var collection = items.filter(function (item) {
    switch (comparisonOperator) {
      case '==':
        return nestedValue(item, key) === Number(comparisonValue) || nestedValue(item, key) === comparisonValue.toString();

      default:
      case '===':
        return nestedValue(item, key) === comparisonValue;

      case '!=':
      case '<>':
        return nestedValue(item, key) !== Number(comparisonValue) && nestedValue(item, key) !== comparisonValue.toString();

      case '!==':
        return nestedValue(item, key) !== comparisonValue;

      case '<':
        return nestedValue(item, key) < comparisonValue;

      case '<=':
        return nestedValue(item, key) <= comparisonValue;

      case '>':
        return nestedValue(item, key) > comparisonValue;

      case '>=':
        return nestedValue(item, key) >= comparisonValue;

    }
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereIn.js":
/*!*********************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereIn.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extractValues = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");
var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

module.exports = function whereIn(key, values) {
  var items = extractValues(values);

  var collection = this.items.filter(function (item) {
    return items.indexOf(nestedValue(item, key)) !== -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/whereNotIn.js":
/*!************************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/whereNotIn.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extractValues = __webpack_require__(/*! ../helpers/values */ "./node_modules/collect.js/dist/helpers/values.js");
var nestedValue = __webpack_require__(/*! ../helpers/nestedValue */ "./node_modules/collect.js/dist/helpers/nestedValue.js");

module.exports = function whereNotIn(key, values) {
  var items = extractValues(values);

  var collection = this.items.filter(function (item) {
    return items.indexOf(nestedValue(item, key)) === -1;
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/wrap.js":
/*!******************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/wrap.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function wrap(value) {
  if (value instanceof this.constructor) {
    return value;
  }

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return new this.constructor(value);
  }

  return new this.constructor([value]);
};

/***/ }),

/***/ "./node_modules/collect.js/dist/methods/zip.js":
/*!*****************************************************!*\
  !*** ./node_modules/collect.js/dist/methods/zip.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function zip(array) {
  var _this = this;

  var values = array;

  if (values instanceof this.constructor) {
    values = values.all();
  }

  var collection = this.items.map(function (item, index) {
    return new _this.constructor([item, values[index]]);
  });

  return new this.constructor(collection);
};

/***/ }),

/***/ "./node_modules/escape-regexp-component/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/escape-regexp-component/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Escape regexp special characters in `str`.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

module.exports = function(str){
  return String(str).replace(/([.*+?=^!:${}()|[\]\/\\])/g, '\\$1');
};

/***/ }),

/***/ "./node_modules/pluralize/pluralize.js":
/*!*********************************************!*\
  !*** ./node_modules/pluralize/pluralize.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* global define */

(function (root, pluralize) {
  /* istanbul ignore else */
  if (true) {
    // Node.
    module.exports = pluralize();
  } else {}
})(this, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules = [];
  var singularRules = [];
  var uncountables = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  function sanitizeRule (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$', 'i');
    }

    return rule;
  }

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   word
   * @param  {string}   token
   * @return {Function}
   */
  function restoreCase (word, token) {
    // Tokens are an exact match.
    if (word === token) return token;

    // Upper cased words. E.g. "HELLO".
    if (word === word.toUpperCase()) return token.toUpperCase();

    // Title cased words. E.g. "Title".
    if (word[0] === word[0].toUpperCase()) {
      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }

    // Lower cased words. E.g. "test".
    return token.toLowerCase();
  }

  /**
   * Interpolate a regexp string.
   *
   * @param  {string} str
   * @param  {Array}  args
   * @return {string}
   */
  function interpolate (str, args) {
    return str.replace(/\$(\d{1,2})/g, function (match, index) {
      return args[index] || '';
    });
  }

  /**
   * Replace a word using a rule.
   *
   * @param  {string} word
   * @param  {Array}  rule
   * @return {string}
   */
  function replace (word, rule) {
    return word.replace(rule[0], function (match, index) {
      var result = interpolate(rule[1], arguments);

      if (match === '') {
        return restoreCase(word[index - 1], result);
      }

      return restoreCase(match, result);
    });
  }

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {string}   token
   * @param  {string}   word
   * @param  {Array}    rules
   * @return {string}
   */
  function sanitizeWord (token, word, rules) {
    // Empty string or doesn't need fixing.
    if (!token.length || uncountables.hasOwnProperty(token)) {
      return word;
    }

    var len = rules.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = rules[len];

      if (rule[0].test(word)) return replace(word, rule);
    }

    return word;
  }

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  function replaceWord (replaceMap, keepMap, rules) {
    return function (word) {
      // Get the correct token and case restoration functions.
      var token = word.toLowerCase();

      // Check against the keep object map.
      if (keepMap.hasOwnProperty(token)) {
        return restoreCase(word, token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap.hasOwnProperty(token)) {
        return restoreCase(word, replaceMap[token]);
      }

      // Run all the rules against the word.
      return sanitizeWord(token, word, rules);
    };
  }

  /**
   * Check if a word is part of the map.
   */
  function checkWord (replaceMap, keepMap, rules, bool) {
    return function (word) {
      var token = word.toLowerCase();

      if (keepMap.hasOwnProperty(token)) return true;
      if (replaceMap.hasOwnProperty(token)) return false;

      return sanitizeWord(token, token, rules) === token;
    };
  }

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {string}  word
   * @param  {number}  count
   * @param  {boolean} inclusive
   * @return {string}
   */
  function pluralize (word, count, inclusive) {
    var pluralized = count === 1
      ? pluralize.singular(word) : pluralize.plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  }

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Check if a word is plural.
   *
   * @type {Function}
   */
  pluralize.isPlural = checkWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Check if a word is singular.
   *
   * @type {Function}
   */
  pluralize.isSingular = checkWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      uncountables[word.toLowerCase()] = true;
      return;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$0');
    pluralize.addSingularRule(word, '$0');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {string} single
   * @param {string} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = plural.toLowerCase();
    single = single.toLowerCase();

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I', 'we'],
    ['me', 'us'],
    ['he', 'they'],
    ['she', 'they'],
    ['them', 'them'],
    ['myself', 'ourselves'],
    ['yourself', 'yourselves'],
    ['itself', 'themselves'],
    ['herself', 'themselves'],
    ['himself', 'themselves'],
    ['themself', 'themselves'],
    ['is', 'are'],
    ['was', 'were'],
    ['has', 'have'],
    ['this', 'these'],
    ['that', 'those'],
    // Words ending in with a consonant and `o`.
    ['echo', 'echoes'],
    ['dingo', 'dingoes'],
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus', 'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma', 'stigmata'],
    ['stoma', 'stomata'],
    ['dogma', 'dogmata'],
    ['lemma', 'lemmata'],
    ['schema', 'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox', 'oxen'],
    ['axe', 'axes'],
    ['die', 'dice'],
    ['yes', 'yeses'],
    ['foot', 'feet'],
    ['eave', 'eaves'],
    ['goose', 'geese'],
    ['tooth', 'teeth'],
    ['quiz', 'quizzes'],
    ['human', 'humans'],
    ['proof', 'proofs'],
    ['carve', 'carves'],
    ['valve', 'valves'],
    ['looey', 'looies'],
    ['thief', 'thieves'],
    ['groove', 'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/i, 's'],
    [/[^\u0000-\u007F]$/i, '$0'],
    [/([^aeiou]ese)$/i, '$1'],
    [/(ax|test)is$/i, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/i, '$1es'],
    [/(e[mn]u)s?$/i, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/i, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
    [/(seraph|cherub)(?:im)?$/i, '$1im'],
    [/(her|at|gr)o$/i, '$1oes'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
    [/sis$/i, 'ses'],
    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
    [/([^aeiouy]|qu)y$/i, '$1ies'],
    [/([^ch][ieo][ln])ey$/i, '$1ies'],
    [/(x|ch|ss|sh|zz)$/i, '$1es'],
    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
    [/(m|l)(?:ice|ouse)$/i, '$1ice'],
    [/(pe)(?:rson|ople)$/i, '$1ople'],
    [/(child)(?:ren)?$/i, '$1ren'],
    [/eaux$/i, '$0'],
    [/m[ae]n$/i, 'men'],
    ['thou', 'you']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/i, ''],
    [/(ss)$/i, '$1'],
    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
    [/ies$/i, 'y'],
    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
    [/\b(mon|smil)ies$/i, '$1ey'],
    [/(m|l)ice$/i, '$1ouse'],
    [/(seraph|cherub)im$/i, '$1'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|(?:her|at|gr)o|ris)(?:es)?$/i, '$1'],
    [/(analy|ba|diagno|parenthe|progno|synop|the|empha|cri)(?:sis|ses)$/i, '$1sis'],
    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
    [/(test)(?:is|es)$/i, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
    [/(alumn|alg|vertebr)ae$/i, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
    [/(matr|append)ices$/i, '$1ix'],
    [/(pe)(rson|ople)$/i, '$1rson'],
    [/(child)ren$/i, '$1'],
    [/(eau)x?$/i, '$1'],
    [/men$/i, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'adulthood',
    'advice',
    'agenda',
    'aid',
    'alcohol',
    'ammo',
    'anime',
    'athletics',
    'audio',
    'bison',
    'blood',
    'bream',
    'buffalo',
    'butter',
    'carp',
    'cash',
    'chassis',
    'chess',
    'clothing',
    'cod',
    'commerce',
    'cooperation',
    'corps',
    'debris',
    'diabetes',
    'digestion',
    'elk',
    'energy',
    'equipment',
    'excretion',
    'expertise',
    'flounder',
    'fun',
    'gallows',
    'garbage',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'housework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'literature',
    'machinery',
    'mackerel',
    'mail',
    'media',
    'mews',
    'moose',
    'music',
    'manga',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'research',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'tennis',
    'traffic',
    'transporation',
    'trout',
    'tuna',
    'wealth',
    'welfare',
    'whiting',
    'wildebeest',
    'wildlife',
    'you',
    // Regexes.
    /[^aeiou]ese$/i, // "chinese", "japanese"
    /deer$/i, // "deer", "reindeer"
    /fish$/i, // "fish", "blowfish", "angelfish"
    /measles$/i,
    /o[iu]s$/i, // "carnivorous"
    /pox$/i, // "chickpox", "smallpox"
    /sheep$/i
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/title-case-minors/index.js":
/*!*************************************************!*\
  !*** ./node_modules/title-case-minors/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = [
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'en',
  'for',
  'from',
  'how',
  'if',
  'in',
  'neither',
  'nor',
  'of',
  'on',
  'only',
  'onto',
  'out',
  'or',
  'per',
  'so',
  'than',
  'that',
  'the',
  'to',
  'until',
  'up',
  'upon',
  'v',
  'v.',
  'versus',
  'vs',
  'vs.',
  'via',
  'when',
  'with',
  'without',
  'yet'
]


/***/ }),

/***/ "./node_modules/to-camel-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-camel-case/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var space = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toCamelCase

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase(string) {
  return space(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}


/***/ }),

/***/ "./node_modules/to-capital-case/index.js":
/*!***********************************************!*\
  !*** ./node_modules/to-capital-case/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var space = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toCapitalCase

/**
 * Convert a `string` to capital case.
 *
 * @param {String} string
 * @return {String}
 */

function toCapitalCase(string) {
  return space(string).replace(/(^|\s)(\w)/g, function (matches, previous, letter) {
    return previous + letter.toUpperCase()
  })
}


/***/ }),

/***/ "./node_modules/to-case/lib/cases.js":
/*!*******************************************!*\
  !*** ./node_modules/to-case/lib/cases.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var camel = __webpack_require__(/*! to-camel-case */ "./node_modules/to-camel-case/index.js")
var capital = __webpack_require__(/*! to-capital-case */ "./node_modules/to-capital-case/index.js")
var constant = __webpack_require__(/*! to-constant-case */ "./node_modules/to-constant-case/index.js")
var dot = __webpack_require__(/*! to-dot-case */ "./node_modules/to-dot-case/index.js")
var none = __webpack_require__(/*! to-no-case */ "./node_modules/to-no-case/index.js")
var pascal = __webpack_require__(/*! to-pascal-case */ "./node_modules/to-pascal-case/index.js")
var sentence = __webpack_require__(/*! to-sentence-case */ "./node_modules/to-sentence-case/index.js")
var slug = __webpack_require__(/*! to-slug-case */ "./node_modules/to-slug-case/index.js")
var snake = __webpack_require__(/*! to-snake-case */ "./node_modules/to-snake-case/index.js")
var space = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")
var title = __webpack_require__(/*! to-title-case */ "./node_modules/to-title-case/index.js")

/**
 * Camel.
 */

exports.camel = camel

/**
 * Pascal.
 */

exports.pascal = pascal

/**
 * Dot. Should precede lowercase.
 */

exports.dot = dot

/**
 * Slug. Should precede lowercase.
 */

exports.slug = slug

/**
 * Snake. Should precede lowercase.
 */

exports.snake = snake

/**
 * Space. Should precede lowercase.
 */

exports.space = space

/**
 * Constant. Should precede uppercase.
 */

exports.constant = constant

/**
 * Capital. Should precede sentence and title.
 */

exports.capital = capital

/**
 * Title.
 */

exports.title = title

/**
 * Sentence.
 */

exports.sentence = sentence

/**
 * Convert a `string` to lower case from camel, slug, etc. Different that the
 * usual `toLowerCase` in that it will try to break apart the input first.
 *
 * @param {String} string
 * @return {String}
 */

exports.lower = function (string) {
  return none(string).toLowerCase()
}

/**
 * Convert a `string` to upper case from camel, slug, etc. Different that the
 * usual `toUpperCase` in that it will try to break apart the input first.
 *
 * @param {String} string
 * @return {String}
 */

exports.upper = function (string) {
  return none(string).toUpperCase()
}

/**
 * Invert each character in a `string` from upper to lower and vice versa.
 *
 * @param {String} string
 * @return {String}
 */

exports.inverse = function (string) {
  var chars = string.split('')
  for (var i = 0, char; char = chars[i]; i++) {
    if (!/[a-z]/i.test(char)) continue
    var upper = char.toUpperCase()
    var lower = char.toLowerCase()
    chars[i] = char == upper ? lower : upper
  }
  return chars.join('')
}

/**
 * None.
 */

exports.none = none


/***/ }),

/***/ "./node_modules/to-case/lib/index.js":
/*!*******************************************!*\
  !*** ./node_modules/to-case/lib/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var cases = __webpack_require__(/*! ./cases */ "./node_modules/to-case/lib/cases.js")

/**
 * Export `determineCase`.
 */

module.exports = exports = determineCase

/**
 * Export `cases`.
 */

exports.cases = cases

/**
 * Determine the case of a `string`.
 *
 * @param {String} string
 * @return {String|Null}
 */

function determineCase(string){
  for (var key in cases) {
    if (key == 'none') continue
    var convert = cases[key]
    if (convert(string) == string) return key
  }
  return null
}

/**
 * Define a case by `name` with a `convert` function.
 *
 * @param {String} name
 * @param {Object} convert
 */

exports.add = function(name, convert){
  exports[name] = cases[name] = convert
}

/**
 * Export all the `cases`.
 */

for (var key in cases) {
  exports.add(key, cases[key])
}


/***/ }),

/***/ "./node_modules/to-constant-case/index.js":
/*!************************************************!*\
  !*** ./node_modules/to-constant-case/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var snake = __webpack_require__(/*! to-snake-case */ "./node_modules/to-snake-case/index.js")

/**
 * Export.
 */

module.exports = toConstantCase

/**
 * Convert a `string` to constant case.
 *
 * @param {String} string
 * @return {String}
 */

function toConstantCase(string) {
  return snake(string).toUpperCase()
}


/***/ }),

/***/ "./node_modules/to-dot-case/index.js":
/*!*******************************************!*\
  !*** ./node_modules/to-dot-case/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var space = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toDotCase

/**
 * Convert a `string` to slug case.
 *
 * @param {String} string
 * @return {String}
 */

function toDotCase(string) {
  return space(string).replace(/\s/g, '.')
}


/***/ }),

/***/ "./node_modules/to-no-case/index.js":
/*!******************************************!*\
  !*** ./node_modules/to-no-case/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Export.
 */

module.exports = toNoCase

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/
var hasSeparator = /(_|-|\.|:)/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}


/***/ }),

/***/ "./node_modules/to-pascal-case/index.js":
/*!**********************************************!*\
  !*** ./node_modules/to-pascal-case/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var space = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toPascalCase

/**
 * Convert a `string` to pascal case.
 *
 * @param {String} string
 * @return {String}
 */

function toPascalCase(string) {
  return space(string).replace(/(?:^|\s)(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}


/***/ }),

/***/ "./node_modules/to-sentence-case/index.js":
/*!************************************************!*\
  !*** ./node_modules/to-sentence-case/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var clean = __webpack_require__(/*! to-no-case */ "./node_modules/to-no-case/index.js")

/**
 * Export.
 */

module.exports = toSentenceCase

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toSentenceCase(string) {
  return clean(string).replace(/[a-z]/i, function (letter) {
    return letter.toUpperCase()
  }).trim()
}


/***/ }),

/***/ "./node_modules/to-slug-case/index.js":
/*!********************************************!*\
  !*** ./node_modules/to-slug-case/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var toSpace = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toSlugCase

/**
 * Convert a `string` to slug case.
 *
 * @param {String} string
 * @return {String}
 */

function toSlugCase(string) {
  return toSpace(string).replace(/\s/g, '-')
}


/***/ }),

/***/ "./node_modules/to-snake-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-snake-case/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var toSpace = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toSnakeCase

/**
 * Convert a `string` to snake case.
 *
 * @param {String} string
 * @return {String}
 */

function toSnakeCase(string) {
  return toSpace(string).replace(/\s/g, '_')
}


/***/ }),

/***/ "./node_modules/to-space-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-space-case/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var clean = __webpack_require__(/*! to-no-case */ "./node_modules/to-no-case/index.js")

/**
 * Export.
 */

module.exports = toSpaceCase

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}


/***/ }),

/***/ "./node_modules/to-title-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-title-case/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var sentence = __webpack_require__(/*! to-sentence-case */ "./node_modules/to-sentence-case/index.js")
var escape = __webpack_require__(/*! escape-regexp-component */ "./node_modules/escape-regexp-component/index.js")
var minors = __webpack_require__(/*! title-case-minors */ "./node_modules/title-case-minors/index.js")

/**
 * Export.
 */

module.exports = toTitleCase

/**
 * Matchers.
 */

var escaped = minors.map(escape)
var minorMatcher = new RegExp('[^^]\\b(' + escaped.join('|') + ')\\b', 'ig')
var punctuationMatcher = /:\s*(\w)/g

/**
 * Convert a `string` to title case.
 *
 * @param {String} string
 * @return {String}
 */

function toTitleCase(string) {
  return sentence(string)
    .replace(/(^|\s)(\w)/g, function (matches, previous, letter) {
      return previous + letter.toUpperCase()
    })
    .replace(minorMatcher, function (minor) {
      return minor.toLowerCase()
    })
    .replace(punctuationMatcher, function (letter) {
      return letter.toUpperCase()
    })
}


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, repository, keywords, author, license, bugs, homepage, devDependencies, dependencies, default */
/***/ (function(module) {

module.exports = {"name":"vue-graphql-models","version":"1.7.15","description":"Universal library which helps to build OOP-driven GraphQL based models for Vue components. Influenced by Laravel Eloquent Models & Collections.","main":"lib/vue-graphql-models.js","scripts":{"build":"webpack --env dev && webpack --env build && npm run test","dev":"webpack --progress --colors --watch --env dev","test":"mocha ./test/*.spec.js","test:watch":"mocha -w ./test/*.spec.js"},"repository":{"type":"git","url":"https://github.com/digitalideastudio/vue-graphql-models.git"},"keywords":["oop","es6","models","vue","universal","umd","commonjs","webpack","collections","laravel","eloquent","graphql"],"author":"Serhii Matrunchyk","license":"MIT","bugs":{"url":"https://github.com/digitalideastudio/vue-graphql-models/issues"},"homepage":"https://github.com/digitalideastudio/vue-graphql-models","devDependencies":{"@babel/cli":"^7.1.2","@babel/core":"^7.1.2","@babel/plugin-proposal-class-properties":"^7.1.0","@babel/plugin-proposal-export-default-from":"^7.0.0","@babel/plugin-proposal-object-rest-spread":"^7.0.0","@babel/plugin-syntax-dynamic-import":"^7.0.0","@babel/preset-env":"^7.1.0","@babel/register":"^7.0.0","babel-eslint":"^10.0.1","babel-loader":"^8.0.0","babel-plugin-add-module-exports":"^1.0.0","chai":"^4.2.0","collect.js":"^4.0.28","eslint":"^5.6.1","eslint-loader":"^2.1.1","istanbul":"^0.4.5","jsdom":"^12.2.0","jsdom-global":"^3.0.2","mocha":"^5.2.0","pluralize":"^7.0.0","to-case":"^2.0.0","uglifyjs-webpack-plugin":"^2.0.1","webpack":"^4.20.2","webpack-cli":"^3.1.2","yargs":"^12.0.2","idempotent-babel-polyfill":"^7.0.0"},"dependencies":{"moment":"^2.22.2","vue":"^2.5.17"}};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default, VueGraphqlModels, BaseModel, Exceptions, Collection, MenuRepository, MenuItem, Menu, Field, Form, Step, Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_VueGraphqlModels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/VueGraphqlModels */ "./src/lib/VueGraphqlModels.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VueGraphqlModels", function() { return _lib_VueGraphqlModels__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _models_BaseModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/BaseModel.js */ "./src/models/BaseModel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseModel", function() { return _models_BaseModel_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _models_Exceptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Exceptions */ "./src/models/Exceptions/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Exceptions", function() { return _models_Exceptions__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _models_Collection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/Collection */ "./src/models/Collection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return _models_Collection__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _models_Menu_repository_MenuRepository__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/Menu/repository/MenuRepository */ "./src/models/Menu/repository/MenuRepository.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuRepository", function() { return _models_Menu_repository_MenuRepository__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _models_Menu_repository_MenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/Menu/repository/MenuItem */ "./src/models/Menu/repository/MenuItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MenuItem", function() { return _models_Menu_repository_MenuItem__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _models_Menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/Menu */ "./src/models/Menu/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return _models_Menu__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _models_Forms_Field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./models/Forms/Field */ "./src/models/Forms/Field.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return _models_Forms_Field__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _models_Forms_Form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./models/Forms/Form */ "./src/models/Forms/Form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return _models_Forms_Form__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _models_Forms_Step__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./models/Forms/Step */ "./src/models/Forms/Step.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Step", function() { return _models_Forms_Step__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_10__; });
// Plugin
 // Base



 // Menu



 // Forms



 // Utils


/* harmony default export */ __webpack_exports__["default"] = (_lib_VueGraphqlModels__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/lib/VueGraphqlModels.js":
/*!*************************************!*\
  !*** ./src/lib/VueGraphqlModels.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_BaseModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/BaseModel */ "./src/models/BaseModel.js");
/* harmony import */ var _models_Forms_Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Forms/Field */ "./src/models/Forms/Field.js");
/* harmony import */ var _models_Menu_repository_MenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/Menu/repository/MenuItem */ "./src/models/Menu/repository/MenuItem.js");



var VueGraphqlModels = {
  install: function install(Vue) {
    var $vgmOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.assign(Vue.prototype, {
      $vgmOptions: $vgmOptions
    });
    Vue.mixin({
      created: function created() {
        if (!Vue.prototype.$pluginInstalled) {
          console.info("VGM Installed successfully. Version: ".concat(_models_BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"].version));
          Object.assign(_models_BaseModel__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, {
            vue: this
          });
          Object.assign(_models_Menu_repository_MenuItem__WEBPACK_IMPORTED_MODULE_2__["default"].prototype, {
            vue: this
          });
          Object.assign(_models_Forms_Field__WEBPACK_IMPORTED_MODULE_1__["default"].prototype, {
            vue: this
          });
          Object.assign(Vue.prototype, {
            $pluginInstalled: true
          });
        }
      }
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (VueGraphqlModels);

/***/ }),

/***/ "./src/lib/eventBus.js":
/*!*****************************!*\
  !*** ./src/lib/eventBus.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0___default.a();
/* harmony default export */ __webpack_exports__["default"] = (EventBus);

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! exports provided: version, isMobile, getGQLDocument, ucwords, lowerCaseFirst, humanBytes, sortBy, pick, defineProperties, getGQLDocumentName, httpPost, readFile, spawn, sleep, intersect, cloneDeep, findRecursive, findRouteMetas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGQLDocument", function() { return getGQLDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ucwords", function() { return ucwords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lowerCaseFirst", function() { return lowerCaseFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanBytes", function() { return humanBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortBy", function() { return sortBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return pick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defineProperties", function() { return defineProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGQLDocumentName", function() { return getGQLDocumentName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "httpPost", function() { return httpPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFile", function() { return readFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spawn", function() { return spawn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersect", function() { return intersect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneDeep", function() { return cloneDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRecursive", function() { return findRecursive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRouteMetas", function() { return findRouteMetas; });
/* harmony import */ var _models_Exceptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Exceptions */ "./src/models/Exceptions/index.js");
/* harmony import */ var _package__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../package */ "./package.json");
var _package__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../package */ "./package.json", 1);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * @module Utils
 */

/* Environment */

/**
 * Returns library version
 *
 * @returns {string}
 */

function version() {
  return _package__WEBPACK_IMPORTED_MODULE_1__.version;
}
/**
 * Returns true if mobile environment
 *
 * @returns {boolean}
 */

/* istanbul ignore next */


function isMobile
/* istanbul ignore next */
() {
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
  return "".concat(str).replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
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
  if (bytes === 0) {
    return '0.00 B';
  }

  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return "".concat((bytes / Math.pow(1024, e)).toFixed(2), " ").concat(' KMGTP'.charAt(e), "B").replace('  ', ' ');
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
  }).then(function (response) {
    return response.json();
  });
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
  var segments = path.split('/');
  var docName = segments[segments.length - 1];
  return loader(path).catch(function () {
    return _defineProperty({}, docName, {});
  }).then(function (_ref2) {
    var doc = _ref2[docName];
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


function spawn(constructor) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

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
  return JSON.parse(JSON.stringify(obj, function (k, v) {
    return k === '__typename' ? undefined : v;
  }));
}
/**
 * Returns a merged meta object for all matched route objects
 *
 * @param route {object} Vue-router route object
 * @returns {object}
 */


function findRouteMetas(route) {
  return route.matched.map(function (m) {
    return m.meta;
  }).reduce(function (accumulator, current) {
    return Object.assign(accumulator, current);
  }, {});
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
  var setA = new Set(one);
  var setB = new Set(two);
  var intersection = new Set(_toConsumableArray(setA).filter(function (s) {
    return setB.has(s);
  }));
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


function sortBy(items) {
  var sortOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var newItems = items.slice(0);
  var sortKeys = Object.keys(sortOpts);

  if (!sortKeys.length) {
    return newItems;
  }

  return newItems.sort(function (a, b) {
    var level = sortKeys.length + 1;
    var operand = 0;
    sortKeys.some(function (key) {
      level -= 1;
      var dirSign = sortOpts[key] === 'desc' ? -1 : 1;
      var normA = a[key] ? a[key] : 0;
      var normB = b[key] ? b[key] : 0;

      if (normA > normB) {
        operand = level * dirSign;
        return true;
      }

      if (normA < normB) {
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


function findRecursive(source, key, value) {
  var entriesKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'entries';
  var res = null;
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


function pick() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return selected.reduce(function (obj, key) {
    return _objectSpread({}, obj, _defineProperty({}, key, source[key]));
  }, {});
}
/**
 * Retrieves a document name of GraphQL document
 *
 * @param document {GraphQLDocument}
 * @param callerClass {String}
 * @returns {String}
 */


function getGQLDocumentName(document) {
  var callerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'model class';

  if (!document || !document.definitions || !Array.isArray(document.definitions) || !document.definitions.length) {
    throw new _models_Exceptions__WEBPACK_IMPORTED_MODULE_0__["default"].InvalidArgumentException("Invalid GraphQL document specified.\n    Did you forget to add query or mutation to ".concat(callerClass, "?"));
  }

  var definition = document.definitions.find(function (def) {
    return def.kind === 'OperationDefinition';
  });
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


function defineProperties() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function (_ref3) {
      var result = _ref3.target.result;
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


function sleep() {
  var seconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return new Promise(function (resolve) {
    return window.setTimeout(resolve, seconds * 1000);
  });
}



/***/ }),

/***/ "./src/models/BaseModel.js":
/*!*********************************!*\
  !*** ./src/models/BaseModel.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var to_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! to-case */ "./node_modules/to-case/lib/index.js");
/* harmony import */ var to_case__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(to_case__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pluralize */ "./node_modules/pluralize/pluralize.js");
/* harmony import */ var pluralize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pluralize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _Collection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collection */ "./src/models/Collection.js");
/* harmony import */ var _Forms_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Forms/Form */ "./src/models/Forms/Form.js");
/* harmony import */ var _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Exceptions/ConfigurationException */ "./src/models/Exceptions/ConfigurationException.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_7__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var gqlCache = {};
/**
 * Class BaseModel
 */

var BaseModel =
/*#__PURE__*/
function () {
  /**
   * Class constructor
   *
   * @param {Object} params
   */
  function BaseModel() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseModel);

    _defineProperty(this, "__typename", 'Base');

    _defineProperty(this, "_key", '');

    _defineProperty(this, "mutationCreate", {});

    _defineProperty(this, "mutationUpdate", {});

    _defineProperty(this, "query", {});

    _defineProperty(this, "queryMany", {});

    _defineProperty(this, "subscriptions", []);

    _defineProperty(this, "subscriptionsMany", []);

    _defineProperty(this, "createdAt", new Date());

    _defineProperty(this, "createdBy", {});

    _defineProperty(this, "loading", false);

    _defineProperty(this, "defaultSortBy", 'createdBy');

    _defineProperty(this, "inputFields", []);

    _defineProperty(this, "primaryKey", '_key');

    _defineProperty(this, "inputDataKey", 'data');

    _defineProperty(this, "documentsLoaded", false);

    _defineProperty(this, "pForm", null);

    _defineProperty(this, "formOptions", null);

    _defineProperty(this, "vue", {});

    _defineProperty(this, "isEmpty", true);

    this.setDefaultTypename(); // noinspection JSIgnoredPromiseFromCall

    if (!params.empty) {
      this.isEmpty = false;
      this.loadDocuments();
    }

    Object.assign(this, this.defaults, params);
    this.vue = Object.getPrototypeOf(this).vue; // TODO: Probably needs to be async to free up the event loop
    // TODO: so the instance could be built w/o delays

    if (!params.empty) {
      this.init();
    }
  } // Static getters

  /**
   * Returns library version
   *
   * @returns {string}
   */


  _createClass(BaseModel, [{
    key: "gqlLoader",
    // Instance methods
    value: function gqlLoader(path) {
      if (typeof vue__WEBPACK_IMPORTED_MODULE_7___default.a.prototype.$vgmOptions.gqlLoader !== 'function') {
        return Promise.reject("Unable to load \"".concat(path, "\": gqlLoader is not configured.\n        Please make sure that 'BaseModel.gqlLoader(path)' method is overriden in your local BaseModel\n        and returns lazy-loaded GQL document. See library example for reference."));
      }

      return vue__WEBPACK_IMPORTED_MODULE_7___default.a.prototype.$vgmOptions.gqlLoader(path);
    }
    /**
     * Updates a model item and returns updated
     *
     * @returns {Promise<*>}
     */

  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$save;

        var prepared;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                prepared = this.prepareFieldsVariables();
                return _context.abrupt("return", this.save(this.mutationUpdate, (_this$save = {}, _defineProperty(_this$save, this.primaryKey, this[this.primaryKey]), _defineProperty(_this$save, this.inputDataKey, prepared), _this$save)));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function update() {
        return _update.apply(this, arguments);
      };
    }()
    /**
     * Creates a new model item and returns it
     *
     * @returns {Promise<*>}
     */

  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var prepared;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                prepared = this.prepareFieldsVariables();
                return _context2.abrupt("return", this.save(this.mutationCreate, _defineProperty({}, this.inputDataKey, prepared)));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function create() {
        return _create.apply(this, arguments);
      };
    }()
    /**
     * Saves a model item via GQL
     *
     * @param mutation
     * @param variables
     * @returns {Promise<BaseModel>}
     */

  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(mutation) {
        var _this = this;

        var variables,
            opName,
            result,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                variables = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};

                if (!(_typeof(this.vue) !== 'object')) {
                  _context3.next = 3;
                  break;
                }

                throw new _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_6__["default"]("Vue instance must be VueComponent.\n      Make sure that BaseModel.vue contains your local vue instance.");

              case 3:
                if (!(_typeof(this.vue.$apollo) !== 'object')) {
                  _context3.next = 5;
                  break;
                }

                throw new _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_6__["default"]("It seems like vue-apollo is not installed.\n      Make sure that you have installed vue-apollo and configured.");

              case 5:
                opName = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["getGQLDocumentName"])(mutation, this.className); // Sets a loading flag on

                this.setLoading(); // Change updated at

                this.touch();
                _context3.prev = 8;
                _context3.next = 11;
                return this.vue.$apollo.mutate({
                  mutation: mutation,
                  variables: variables,
                  // optimisticResponse: {
                  //   __typename: 'Mutation',
                  //   [opName]: this,
                  // },
                  // Run hooks
                  update: function update(store, _ref) {
                    var data = _ref.data;
                    return _this.updated(store, data[opName]);
                  }
                });

              case 11:
                result = _context3.sent;
                // Update properties returned from a server
                Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["defineProperties"])(this, result.data[opName]);
                _context3.next = 18;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](8);
                console.warn(_context3.t0.message);

              case 18:
                _context3.prev = 18;
                // Sets a loading flag off
                this.setLoading(false);
                return _context3.finish(18);

              case 21:
                return _context3.abrupt("return", this);

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 15, 18, 21]]);
      }));

      return function save(_x) {
        return _save.apply(this, arguments);
      };
    }()
  }, {
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(query) {
        var _this2 = this;

        var variables,
            subscribeToMore,
            opName,
            wantsMany,
            _ref2,
            result,
            resCol,
            filtered,
            sorted,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                variables = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
                subscribeToMore = this.subscribeToMore;
                opName = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["getGQLDocumentName"])(query, this.className);
                wantsMany = variables._key === undefined;
                this.setLoading();
                _context4.prev = 5;
                _context4.next = 8;
                return this.vue.$apollo.query({
                  errorPolicy: 'all',
                  query: query,
                  variables: variables,
                  subscribeToMore: subscribeToMore
                });

              case 8:
                _ref2 = _context4.sent;
                result = _ref2.data[opName];

                if (!(wantsMany || Array.isArray(result))) {
                  _context4.next = 15;
                  break;
                }

                resCol = new _Collection__WEBPACK_IMPORTED_MODULE_4__["default"](result);
                filtered = resCol.filter(function (s) {
                  return s;
                });
                sorted = filtered.sortBy(this.defaultSortBy);
                return _context4.abrupt("return", sorted.map(function (i) {
                  return _this2.hydrate(i);
                }));

              case 15:
                return _context4.abrupt("return", this.hydrate(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(result)));

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](5);
                console.error(_context4.t0.message);
                return _context4.abrupt("return", wantsMany ? new _Collection__WEBPACK_IMPORTED_MODULE_4__["default"]([]) : this.hydrate({}));

              case 22:
                _context4.prev = 22;
                this.setLoading(false);
                return _context4.finish(22);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[5, 18, 22, 25]]);
      }));

      return function fetch(_x2) {
        return _fetch.apply(this, arguments);
      };
    }()
    /**
     * Returns subscription listeners for specific query
     *
     * @param {String} queryName GraphQL query name
     * @returns {Array}
     */

  }, {
    key: "subscribeToMore",
    value: function subscribeToMore(queryName) {
      var _this3 = this;

      var subscribeToMore = [];
      this.subscriptionsMany.forEach(function (sub) {
        // eslint-disable-next-line no-new-object
        var normalizedSub = sub instanceof String ? {
          document: sub
        } : new Object(sub);

        if (!normalizedSub || !normalizedSub.document) {
          return;
        }

        var opSubName = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["getGQLDocumentName"])(normalizedSub.document, _this3.className);
        var subscription = Object.assign({
          document: normalizedSub.document,
          updateQuery: function updateQuery(previousResult, _ref3) {
            var result = _ref3.subscriptionData.data[opSubName];
            return _defineProperty({}, queryName, _toConsumableArray(previousResult[queryName]).concat([result]));
          }
        }, normalizedSub);
        subscribeToMore.push(subscription);
      });
      return subscribeToMore;
    } // Helpers

  }, {
    key: "touch",
    value: function touch() {
      this.updatedAt = new Date();
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "loadDocuments",
    value: function () {
      var _loadDocuments = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.documentsLoaded) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", Promise.resolve());

              case 2:
                return _context6.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee5(resolve, reject) {
                    var entityNamePlural, gqlSrc;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            entityNamePlural = pluralize__WEBPACK_IMPORTED_MODULE_2__(_this4.className);
                            gqlSrc = to_case__WEBPACK_IMPORTED_MODULE_1___default.a.camel(entityNamePlural);
                            _context5.prev = 2;
                            _context5.next = 5;
                            return Promise.all([_this4.getCachedGql('query', "".concat(gqlSrc, "/queries/fetch").concat(_this4.className)), _this4.getCachedGql('queryMany', "".concat(gqlSrc, "/queries/fetch").concat(entityNamePlural)), _this4.getCachedGql('mutationCreate', "".concat(gqlSrc, "/mutations/create").concat(_this4.className)), _this4.getCachedGql('mutationUpdate', "".concat(gqlSrc, "/mutations/update").concat(_this4.className))]);

                          case 5:
                            _this4.documentsLoaded = true;
                            resolve();
                            _context5.next = 12;
                            break;

                          case 9:
                            _context5.prev = 9;
                            _context5.t0 = _context5["catch"](2);
                            reject(_context5.t0);

                          case 12:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5, this, [[2, 9]]);
                  }));

                  return function (_x3, _x4) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function loadDocuments() {
        return _loadDocuments.apply(this, arguments);
      };
    }()
    /**
     * Retrieves cached GQL document from a local cache and adds it of it doesn't there yet.
     *
     * @param propName {string}
     * @param path {string}
     * @returns {Promise<void>}
     */

  }, {
    key: "getCachedGql",
    value: function () {
      var _getCachedGql = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(propName, path) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(!this[propName] || !this[propName].definitions)) {
                  _context7.next = 6;
                  break;
                }

                if (gqlCache[path]) {
                  _context7.next = 5;
                  break;
                }

                _context7.next = 4;
                return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["getGQLDocument"])(this.gqlLoader, path);

              case 4:
                gqlCache[path] = _context7.sent;

              case 5:
                this[propName] = gqlCache[path];

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function getCachedGql(_x5, _x6) {
        return _getCachedGql.apply(this, arguments);
      };
    }()
    /**
     * This function prepared inputFieldsVariables for sending to backend
     * values must be String (ID) or Array of IDs
     */

  }, {
    key: "prepareFieldsVariables",
    value: function prepareFieldsVariables() {
      var inputFieldsVariables = this.inputFieldsVariables;
      var inputFields = Object.keys(inputFieldsVariables);
      var prepared = {};
      inputFields.forEach(function (key) {
        // if value is Collection
        if (inputFieldsVariables[key] instanceof _Collection__WEBPACK_IMPORTED_MODULE_4__["default"]) {
          var collection = inputFieldsVariables[key].all();
          collection = collection.filter(function (item) {
            return item;
          });

          if (Array.isArray(collection) && collection.length) {
            var obj = collection[0];

            if (_typeof(obj) === 'object') {
              collection = collection.filter(function (ob) {
                return ob._id;
              });
              collection = collection.map(function (ob) {
                return ob._id;
              });
            }
          }

          Object.assign(prepared, _defineProperty({}, key, collection)); // if value is Object extended BaseModel
        } else if (inputFieldsVariables[key] instanceof BaseModel) {
          Object.assign(prepared, _defineProperty({}, key, inputFieldsVariables[key]._id)); // Object.assign(prepared, { [key]: inputFieldsVariables[key]
          // .[inputFieldsVariables[key].primaryKey] });
          // if value is Array of Objects
        } else if (Array.isArray(inputFieldsVariables[key])) {
          var arrayOfvalues = inputFieldsVariables[key];

          if (arrayOfvalues.length) {
            var _obj = arrayOfvalues[0];

            if (_typeof(_obj) === 'object') {
              arrayOfvalues = arrayOfvalues.map(function (ob) {
                return ob._id;
              });
            }
          }

          Object.assign(prepared, _defineProperty({}, key, arrayOfvalues)); // if value is Object
        } else if (_typeof(inputFieldsVariables[key]) === 'object' && inputFieldsVariables[key]) {
          Object.assign(prepared, _defineProperty({}, key, inputFieldsVariables[key]._id)); // if value is simple type
        } else {
          Object.assign(prepared, _defineProperty({}, key, inputFieldsVariables[key]));
        }
      });
      return prepared;
    }
  }, {
    key: "hydrate",
    value: function hydrate(item) {
      return new this.constructor(item);
    }
  }, {
    key: "ifTypeName",
    value: function ifTypeName(type) {
      return this.__typename === type;
    }
  }, {
    key: "setDefaultTypename",
    value: function setDefaultTypename() {
      this.__typename = this.className;
    }
  }, {
    key: "setLoading",
    value: function setLoading() {
      var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.loading = loading;
    } // Hooks

  }, {
    key: "updated",
    value: function updated() {}
  }, {
    key: "defaults",
    // Instance getters

    /**
     * Defines and returns model defaults
     *
     * @returns {{}}
     */
    get: function get() {
      return {};
    }
    /**
     * Returns a formatted (from-now) create date
     *
     * @returns {string}
     */

  }, {
    key: "createdAtFormatted",
    get: function get() {
      return moment__WEBPACK_IMPORTED_MODULE_0___default()(this.createdAt).fromNow();
    }
    /**
     * Returns a timestamped date
     *
     * @returns {Number}
     */

  }, {
    key: "createdAtTimestamp",
    get: function get() {
      return moment__WEBPACK_IMPORTED_MODULE_0___default()(this.createdAt).valueOf();
    }
    /**
     * Returns variables being sent as input data
     *
     * @returns {*|{}}
     */

  }, {
    key: "inputFieldsVariables",
    get: function get() {
      return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["pick"])(this, this.inputFields);
    }
    /**
     * Returns an instance class name
     *
     * @returns {*}
     */

  }, {
    key: "className",
    get: function get() {
      return this.constructor.name;
    }
    /**
     * Defines a router path to a single asset
     *
     * @returns {{name: string, params: {key: string}}}
     */

  }, {
    key: "routerPath",
    get: function get() {
      if (_typeof(this.vue) !== 'object') {
        throw new _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_6__["default"]("Vue instance must be VueComponent.\n      Make sure that BaseModel.vue contains your local vue instance.");
      }

      if (_typeof(this.vue.$route) !== 'object') {
        throw new _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_6__["default"]("It seems like vue-router is not installed.\n      Make sure that you have installed vue-router and configured.");
      }

      var from = this.vue.$route.fullPath;
      return {
        name: to_case__WEBPACK_IMPORTED_MODULE_1___default.a.snake(this.className),
        params: {
          key: this._key
        },
        query: {
          from: from
        }
      };
    }
    /**
     * Return Froms object
     *
     * @returns {Form}
     */

  }, {
    key: "form",
    get: function get() {
      if (!this.pForm) {
        this.pForm = new _Forms_Form__WEBPACK_IMPORTED_MODULE_5__["default"](this);
      }

      return this.pForm;
    } // Static methods

    /**
     * Finds a single model item
     *
     * @param variables
     * @returns {Promise<{BaseModel}>}
     */

  }], [{
    key: "find",
    value: function () {
      var _find = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var variables,
            instance,
            _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                variables = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                instance = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["spawn"])(this);
                _context8.next = 4;
                return instance.loadDocuments();

              case 4:
                return _context8.abrupt("return", instance.fetch(instance.query, variables));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function find() {
        return _find.apply(this, arguments);
      };
    }()
    /**
     * Finds multiple model item
     *
     * @property {Object} variables - variables to filter
     * @returns {Promise<{BaseModel[]}>}
     */

  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        var variables,
            instance,
            _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                variables = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
                instance = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["spawn"])(this);
                _context9.next = 4;
                return instance.loadDocuments();

              case 4:
                return _context9.abrupt("return", instance.fetch(instance.queryMany, variables));

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function get() {
        return _get.apply(this, arguments);
      };
    }()
    /**
     * Returns an empty collection of model items.
     * It is useful when initializing the model in a vue component.
     *
     * @returns {Collection}
     */

  }, {
    key: "emptyCollection",
    value: function emptyCollection() {
      return new _Collection__WEBPACK_IMPORTED_MODULE_4__["default"]();
    }
    /**
     * Returns an empty item of model.
     * It is useful when initializing the model in a vue component.
     *
     * @returns {BaseModel}
     */

  }, {
    key: "empty",
    value: function empty() {
      // noinspection JSValidateTypes
      return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["spawn"])(this, [{
        empty: true
      }]);
    }
  }, {
    key: "version",
    get: function get() {
      return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["version"])();
    }
    /**
     * Returns static class name
     *
     * @returns {String}
     */

  }, {
    key: "className",
    get: function get() {
      // noinspection JSUnresolvedVariable
      return this.name;
    }
  }]);

  return BaseModel;
}();

/* harmony default export */ __webpack_exports__["default"] = (BaseModel);

/***/ }),

/***/ "./src/models/Collection.js":
/*!**********************************!*\
  !*** ./src/models/Collection.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var collect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! collect.js */ "./node_modules/collect.js/dist/index.js");
/* harmony import */ var collect_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(collect_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils */ "./src/lib/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Collection =
/*#__PURE__*/
function () {
  function Collection(items) {
    _classCallCheck(this, Collection);

    _defineProperty(this, "collection", []);

    this.collection = collect_js__WEBPACK_IMPORTED_MODULE_0___default()(items);
    return new Proxy(this, {
      get: Collection.__get
    });
  }

  _createClass(Collection, [{
    key: "sortExtendedBy",
    value: function sortExtendedBy() {
      var sortOpts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return collect_js__WEBPACK_IMPORTED_MODULE_0___default()(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__["sortBy"])(this.collection.all(), sortOpts));
    }
  }], [{
    key: "__get",
    value: function __get(target, prop) {
      if (Reflect.has(target, prop)) {
        return Reflect.get(target, prop);
      }

      var items = Reflect.get(target, 'collection');

      if (Reflect.has(items, prop)) {
        return Reflect.get(items, prop);
      }

      return undefined;
    }
  }]);

  return Collection;
}();

/* harmony default export */ __webpack_exports__["default"] = (Collection);

/***/ }),

/***/ "./src/models/Exceptions/BaseException.js":
/*!************************************************!*\
  !*** ./src/models/Exceptions/BaseException.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseException; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BaseException =
/*#__PURE__*/
function (_Error) {
  _inherits(BaseException, _Error);

  function BaseException() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, BaseException);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseException).call(this));
    _this.message = message;

    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(_assertThisInitialized(_assertThisInitialized(_this)), BaseException);
    } else {
      _this.stack = new Error().stack;
    }

    return _this;
  }

  return BaseException;
}(_wrapNativeSuper(Error));



/***/ }),

/***/ "./src/models/Exceptions/ConfigurationException.js":
/*!*********************************************************!*\
  !*** ./src/models/Exceptions/ConfigurationException.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConfigurationException; });
/* harmony import */ var _BaseException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseException */ "./src/models/Exceptions/BaseException.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var ConfigurationException =
/*#__PURE__*/
function (_BaseException) {
  _inherits(ConfigurationException, _BaseException);

  function ConfigurationException() {
    _classCallCheck(this, ConfigurationException);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConfigurationException).apply(this, arguments));
  }

  return ConfigurationException;
}(_BaseException__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/models/Exceptions/InvalidArgumentException.js":
/*!***********************************************************!*\
  !*** ./src/models/Exceptions/InvalidArgumentException.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidArgumentException; });
/* harmony import */ var _BaseException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseException */ "./src/models/Exceptions/BaseException.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var InvalidArgumentException =
/*#__PURE__*/
function (_BaseException) {
  _inherits(InvalidArgumentException, _BaseException);

  function InvalidArgumentException() {
    _classCallCheck(this, InvalidArgumentException);

    return _possibleConstructorReturn(this, _getPrototypeOf(InvalidArgumentException).apply(this, arguments));
  }

  return InvalidArgumentException;
}(_BaseException__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/models/Exceptions/index.js":
/*!****************************************!*\
  !*** ./src/models/Exceptions/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseException */ "./src/models/Exceptions/BaseException.js");
/* harmony import */ var _InvalidArgumentException__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InvalidArgumentException */ "./src/models/Exceptions/InvalidArgumentException.js");
/* harmony import */ var _ConfigurationException__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConfigurationException */ "./src/models/Exceptions/ConfigurationException.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  BaseException: _BaseException__WEBPACK_IMPORTED_MODULE_0__["default"],
  InvalidArgumentException: _InvalidArgumentException__WEBPACK_IMPORTED_MODULE_1__["default"],
  ConfigurationException: _ConfigurationException__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/models/Forms/Field.js":
/*!***********************************!*\
  !*** ./src/models/Forms/Field.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Field; });
/* harmony import */ var _Collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Collection */ "./src/models/Collection.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/utils */ "./src/lib/utils.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Field =
/*#__PURE__*/
function () {
  function Field(_ref) {
    var _ref$chips = _ref.chips,
        chips = _ref$chips === void 0 ? false : _ref$chips,
        defValue = _ref.defValue,
        description = _ref.description,
        _ref$conditions = _ref.conditions,
        conditions = _ref$conditions === void 0 ? [] : _ref$conditions,
        _ref$itemText = _ref.itemText,
        itemText = _ref$itemText === void 0 ? 'name' : _ref$itemText,
        _ref$itemValue = _ref.itemValue,
        itemValue = _ref$itemValue === void 0 ? 'name' : _ref$itemValue,
        label = _ref.label,
        _ref$multiple = _ref.multiple,
        multiple = _ref$multiple === void 0 ? false : _ref$multiple,
        name = _ref.name,
        _ref$returnObject = _ref.returnObject,
        returnObject = _ref$returnObject === void 0 ? false : _ref$returnObject,
        _ref$source = _ref.source,
        source = _ref$source === void 0 ? '' : _ref$source,
        _ref$sourceType = _ref.sourceType,
        sourceType = _ref$sourceType === void 0 ? '' : _ref$sourceType,
        type = _ref.type,
        _ref$validations = _ref.validations,
        validations = _ref$validations === void 0 ? {} : _ref$validations,
        _ref$empty = _ref.empty,
        empty = _ref$empty === void 0 ? false : _ref$empty;

    _classCallCheck(this, Field);

    _defineProperty(this, "chips", false);

    _defineProperty(this, "defValue", null);

    _defineProperty(this, "description", '');

    _defineProperty(this, "conditions", []);

    _defineProperty(this, "itemText", 'name');

    _defineProperty(this, "itemValue", 'name');

    _defineProperty(this, "label", '');

    _defineProperty(this, "loading", false);

    _defineProperty(this, "multiple", false);

    _defineProperty(this, "name", '');

    _defineProperty(this, "returnObject", false);

    _defineProperty(this, "selectOptions", []);

    _defineProperty(this, "source", '');

    _defineProperty(this, "sourceType", '');

    _defineProperty(this, "type", '');

    _defineProperty(this, "validations", {});

    _defineProperty(this, "value", null);

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

    if (!empty) {
      this.setOptions();
    }
  }

  _createClass(Field, [{
    key: "dataLoader",
    value: function dataLoader(path) {
      if (typeof vue__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.$vgmOptions.dataLoader !== 'function') {
        return Promise.reject("Unable to load \"".concat(path, "\": dataLoader is not configured.\n        Please make sure that 'Field.dataLoader(path)' method is overriden in your local Field\n        and returns lazy-loaded GQL document. See library example for reference."));
      }

      return vue__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.$vgmOptions.dataLoader(path);
    }
  }, {
    key: "modelLoader",
    value: function modelLoader(path) {
      if (typeof vue__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.$vgmOptions.modelLoader !== 'function') {
        return Promise.reject("Unable to load \"".concat(path, "\": modelLoader is not configured.\n        Please make sure that 'Field.modelLoader(path)' method is overriden in your local Field\n        and returns lazy-loaded GQL document. See library example for reference."));
      }

      return vue__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.$vgmOptions.modelLoader(path);
    }
  }, {
    key: "setOptions",
    value: function setOptions() {
      var _this = this;

      if (this.sourceType === 'json') {
        this.getOptionsFromFile().then(function (_ref2) {
          var items = _ref2.default;
          _this.selectOptions = items;
        }).catch(function (err) {
          console.error(err);
        });
      } else if (this.sourceType === 'collection') {
        this.getCollection().then(function (_ref3) {
          var items = _ref3.items;
          _this.selectOptions = items;
        }).catch(function (err) {
          console.error(err);
        });
      }
    }
  }, {
    key: "getOptionsFromFile",
    value: function () {
      var _getOptionsFromFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var items;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setLoading();
                _context.prev = 1;
                _context.next = 4;
                return this.dataLoader(this.source);

              case 4:
                items = _context.sent;
                this.setLoading(false);
                return _context.abrupt("return", items);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                this.setLoading(false);
                return _context.abrupt("return", []);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      return function getOptionsFromFile() {
        return _getOptionsFromFile.apply(this, arguments);
      };
    }()
  }, {
    key: "getCollection",
    value: function () {
      var _getCollection = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref4, model, _ref5, collection;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.setLoading();
                _context2.prev = 1;
                _context2.next = 4;
                return this.modelLoader(this.source);

              case 4:
                _ref4 = _context2.sent;
                model = _ref4.default;
                _context2.next = 8;
                return model.get();

              case 8:
                _ref5 = _context2.sent;
                collection = _ref5.collection;
                this.setLoading(false);
                return _context2.abrupt("return", collection);

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](1);
                console.error(_context2.t0);
                this.setLoading(false);
                return _context2.abrupt("return", Field.emptyCollection());

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 14]]);
      }));

      return function getCollection() {
        return _getCollection.apply(this, arguments);
      };
    }()
    /**
     * Returns an empty collection of model items.
     * It is useful when initializing the model in a vue component.
     *
     * @returns {Collection}
     */

  }, {
    key: "setLoading",
    value: function setLoading() {
      var loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.loading = loading;
    }
  }], [{
    key: "emptyCollection",
    value: function emptyCollection() {
      return new _Collection__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    /**
     * Returns an empty item of model.
     * It is useful when initializing the model in a vue component.
     *
     * @returns {BaseModel}
     */

  }, {
    key: "empty",
    value: function empty() {
      // noinspection JSValidateTypes
      return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_2__["spawn"])(this, [{
        empty: true
      }]);
    }
  }]);

  return Field;
}();



/***/ }),

/***/ "./src/models/Forms/Form.js":
/*!**********************************!*\
  !*** ./src/models/Forms/Form.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Form; });
/* harmony import */ var _Collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Collection */ "./src/models/Collection.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Step */ "./src/models/Forms/Step.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Form =
/*#__PURE__*/
function () {
  function Form(context) {
    var _this = this;

    _classCallCheck(this, Form);

    _defineProperty(this, "steps", []);

    _defineProperty(this, "context", {});

    this.context = context;
    context.formOptions().then(function (_ref) {
      var steps = _ref.default.steps;
      _this.steps = steps.map(function (option) {
        return new _Step__WEBPACK_IMPORTED_MODULE_2__["default"](option);
      });
    }).catch(function (error) {
      console.error(error);
    });
  }
  /**
   * Returns an empty collection of model items.
   * It is useful when initializing the model in a vue component.
   *
   * @returns {Collection}
   */


  _createClass(Form, null, [{
    key: "emptyCollection",
    value: function emptyCollection() {
      return new _Collection__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    /**
     * Returns an empty item of model.
     * It is useful when initializing the model in a vue component.
     *
     * @returns {BaseModel}
     */

  }, {
    key: "empty",
    value: function empty() {
      // noinspection JSValidateTypes
      return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__["spawn"])(this);
    }
  }]);

  return Form;
}();



/***/ }),

/***/ "./src/models/Forms/Step.js":
/*!**********************************!*\
  !*** ./src/models/Forms/Step.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Step; });
/* harmony import */ var _Collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Collection */ "./src/models/Collection.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field */ "./src/models/Forms/Field.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Step =
/*#__PURE__*/
function () {
  function Step(_ref) {
    var label = _ref.label,
        fields = _ref.fields,
        _ref$conditions = _ref.conditions,
        conditions = _ref$conditions === void 0 ? [] : _ref$conditions;

    _classCallCheck(this, Step);

    _defineProperty(this, "label", '');

    _defineProperty(this, "fields", []);

    _defineProperty(this, "conditions", []);

    this.label = label;
    this.conditions = conditions;
    this.fields = fields.map(function (field) {
      return new _Field__WEBPACK_IMPORTED_MODULE_2__["default"](field);
    });
  }
  /**
   * Returns an empty collection of model items.
   * It is useful when initializing the model in a vue component.
   *
   * @returns {Collection}
   */


  _createClass(Step, null, [{
    key: "emptyCollection",
    value: function emptyCollection() {
      return new _Collection__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    /**
     * Returns an empty item of model.
     * It is useful when initializing the model in a vue component.
     *
     * @returns {BaseModel}
     */

  }, {
    key: "empty",
    value: function empty() {
      // noinspection JSValidateTypes
      return Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__["spawn"])(this);
    }
  }]);

  return Step;
}();



/***/ }),

/***/ "./src/models/Menu/index.js":
/*!**********************************!*\
  !*** ./src/models/Menu/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _repository_MenuRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./repository/MenuRepository */ "./src/models/Menu/repository/MenuRepository.js");
/* harmony import */ var _repository_items_example__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./repository/items/example */ "./src/models/Menu/repository/items/example.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



var Menu = new _repository_MenuRepository__WEBPACK_IMPORTED_MODULE_0__["default"](_toConsumableArray(_repository_items_example__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Menu);

/***/ }),

/***/ "./src/models/Menu/repository/MenuItem.js":
/*!************************************************!*\
  !*** ./src/models/Menu/repository/MenuItem.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_eventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/eventBus */ "./src/lib/eventBus.js");
/* harmony import */ var _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Exceptions/ConfigurationException */ "./src/models/Exceptions/ConfigurationException.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var MenuItem =
/*#__PURE__*/
function () {
  function MenuItem() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MenuItem);

    _defineProperty(this, "id", '');

    _defineProperty(this, "title", 'Menu Item');

    _defineProperty(this, "subtitle", '');

    _defineProperty(this, "route", void 0);

    _defineProperty(this, "href", void 0);

    _defineProperty(this, "customIcon", false);

    _defineProperty(this, "icon", 'home');

    _defineProperty(this, "emitter", 'menuClick');

    Object.assign(this, options);
    this.bus = _lib_eventBus__WEBPACK_IMPORTED_MODULE_0__["default"];
  } // Getters


  _createClass(MenuItem, [{
    key: "getBoundProps",
    // Methods
    value: function getBoundProps() {
      var route = this.route;

      if (_typeof(this.vue) !== 'object') {
        throw new _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_1__["default"]("Vue instance must be VueComponent.\n      Make sure that BaseModel.vue contains your local vue instance.");
      }

      if (_typeof(this.vue.$store) !== 'object') {
        throw new _Exceptions_ConfigurationException__WEBPACK_IMPORTED_MODULE_1__["default"]("It seems like vuex is not installed.\n      Make sure that you have installed vuex and configured.");
      }

      var $store = this.vue.$store;

      if (route && route.path) {
        route = Object.assign(route, {
          params: {
            key: $store.getters['route/key']
          }
        });
      }

      var href = this.href;
      return {
        href: href,
        to: route
      };
    }
  }, {
    key: "hasCustomIcon",
    value: function hasCustomIcon() {
      return this.customIcon;
    }
  }, {
    key: "click",
    value: function click(event) {
      this.bus.$emit('toggleLeftDrawer');
      this.bus.$emit(this.emitter, {
        item: this,
        event: event
      });
    }
  }, {
    key: "boundListeners",
    get: function get() {
      var _this = this;

      return {
        click: function click(event) {
          return _this.click(event);
        }
      };
    }
  }]);

  return MenuItem;
}();

/* harmony default export */ __webpack_exports__["default"] = (MenuItem);

/***/ }),

/***/ "./src/models/Menu/repository/MenuRepository.js":
/*!******************************************************!*\
  !*** ./src/models/Menu/repository/MenuRepository.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuRepository =
/*#__PURE__*/
function () {
  function MenuRepository() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, MenuRepository);

    this.items = items;
    return new Proxy(this, {
      get: MenuRepository.__get
    });
  }

  _createClass(MenuRepository, null, [{
    key: "__get",
    value: function __get(target, prop) {
      // istanbul ignore else
      if (Reflect.has(target, prop)) {
        return Reflect.get(target, prop) || [];
      }

      var menuItems = Reflect.get(target, 'items') || [];
      return menuItems.find(function (i) {
        return i.id === prop;
      });
    }
  }]);

  return MenuRepository;
}();

/* harmony default export */ __webpack_exports__["default"] = (MenuRepository);

/***/ }),

/***/ "./src/models/Menu/repository/items/example.js":
/*!*****************************************************!*\
  !*** ./src/models/Menu/repository/items/example.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MenuItem */ "./src/models/Menu/repository/MenuItem.js");

/* harmony default export */ __webpack_exports__["default"] = ([new _MenuItem__WEBPACK_IMPORTED_MODULE_0__["default"]({
  id: 'exampleItem1',
  title: 'Example 1',
  subtitle: 'This is example 1',
  route: {
    name: 'example1'
  },
  icon: 'home'
}), new _MenuItem__WEBPACK_IMPORTED_MODULE_0__["default"]({
  id: 'exampleItem2',
  title: 'Example 2',
  subtitle: 'This is example 2',
  route: {
    name: 'example2'
  },
  icon: 'home'
})]);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/serhii/code/vue-graphql-models/src/index.js */"./src/index.js");


/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_moment__;

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;

/***/ })

/******/ });
});
//# sourceMappingURL=vue-graphql-models.js.map