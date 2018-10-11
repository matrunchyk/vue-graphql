import collect from 'collect.js';
import { sortBy } from '../lib/utils';

class Collection {
  collection = [];

  constructor(items) {
    this.collection = collect(items);

    return new Proxy(this, {
      get: Collection.__get
    });
  }

  static __get(target, prop) {
    if (Reflect.has(target, prop)) {
      return Reflect.get(target, prop);
    }

    const items = Reflect.get(target, 'collection');

    if (Reflect.has(items, prop)) {
      return Reflect.get(items, prop);
    }

    return undefined;
  }

  sortExtendedBy(sortOpts = {}) {
    return collect(sortBy(this.collection.all(), sortOpts));
  }
}

export default Collection;
