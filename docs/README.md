# Vue-GraphQL

Universal library which helps to build OOP-driven GraphQL based models for Vue components.
Influenced by Laravel Eloquent Models & Collections.

![Travis](https://api.travis-ci.org/matrunchyk/vue-graphql.svg?branch=master)

_Note 1. If you looking for v1 of this library, switch to a [relevant branch](https://github.com/matrunchyk/vue-graphql/tree/v1)._

_Note 2. This library v2 is under development, so the documentation will be updated as soon as it stabilized (soon). Thank you for being patient. Please give me a star if you want to support me doing this._  

## Features

* `BaseModel` is a class which acts as a base entity for your future models extending this class.
* Full encapsulation of GraphQL queries & mutations. No need to call them manually, all you need is to call you Model's `.get()` or `.find()` methods.
* All arrays retrieved from GraphQL will be hydrated with respectful collections of models.
* Supports lazy-loading of GraphQL documents.
* Supports evens & hooks for customization.
* Has built-in FormWizard factory so you can create simple or complex Forms.
* Has built-in support for your application's menus in OOP manner. 

###### Internally:  
* Webpack 4 based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Installation

`npm i vue-graphql -S`

or

`yarn add vue-graphql`

## Configuration

```
import VueGraphqlModels from 'vue-graphql';

Vue.use(VueGraphqlModels);
```

### Basic Usage
#### 1. Define your model:

```
import { BaseModel } from 'vue-graphql';

export default class Fruit extends BaseModel {
 // Your additional logic, if needed
 //   ...or just empty class
}
```

#### 2. Use it in your component:

```
<template>
   <ul>
     <li v-if="model.loading">Loading...</li>
     <li v-else-if="model.error">Loading Failed!</li>
     <li v-else v-for="(item, index) in model.results.all()" :key="index">
       <p>Name: {{ item.name }}</p>
       <p>Color: {{ item.color }}</p>
     </li>
  </ul>
</template>

<script>
import Fruit from '@/models/Fruit';

export default {
  data: () => ({
    model: new Fruit(),
  }),

  created() {
    this.model.get();
  },
}
</script>
```

## Persisting & Cache
In your `vue-apollo.js` file, put the following lines:

```
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';

export const cachePersistor = new CachePersistor({
  cache: new InMemoryCache(),
  storage: window.localStorage,
  debug: process.env.NODE_ENV !== 'production',
});
``` 

## Extended Usage

Intro:
- Typical website consists from a page with list of models (list of products, list of categories, list of any other models) as well as page with a single items (or multiple items). The item here is called as `model` and the list of items is a `collection` of `models`.
- When Vue component is rendering, it usually doesn't have data yet. To avoid errors, we can substitute an empty `Collection` by just using model's method `.emptyCollection()`. To have the same effect for empty model, you can use `.empty()`.
- You can specify your model class in your Vue component's prop validation.
- Each collection has the same methods as Laravel Collection class (credits to [collect.js](https://github.com/ecrmnn/collect.js/))
- Each model can obtain data using specific GraphQL queries and mutations. The only requirement is a folder structure (which is also great to avoid various mistakes and always keep a consistency).
- Each model can have default values for its properties
- Properties can be automatically converted to other objects, for example, array values can be automatically converted to a subcollection of other models.   

1. Create a new Model which you want to use in your Vue component, i.e. `Fruit` by extending the imported `BaseModel` class:

> Fruit.js

```
import { BaseModel } from 'vue-graphql';

class Fruit extends BaseModel {
  // Getters
  get defaults() {
    return {
      name: 'Apple',
      eaten: false,
    };
  }

  get isEaten() {
    return this.eaten; 
  }
  
  // Methods
  eat() {
    this.eaten = true;
  } 
}
```

2. In your Vue component which displays a list of models, import the model for using as a collection:
 
> PageFruits.vue

```
<template>
  <div>
    <input class="search-bar" v-model="search">
    <FruitItem
      v-for="(fruit, index) in filteredFruits.all()"
      :key="index"
      :fruit="fruit"
    />
  </div>
</template>

<script>
import Fruit from '@/models/Fruit';

export default {
  name: 'PageFruits',
  
  components: {
    FruitItem: () => import('./FruitItem'),
  },
  
  data: () => ({
    fruit: Fruit.empty(),
    search: '',
  }),
  
  computed: {
    fruits() {
      return this.fruit.results;
    },
    filteredFruits() {
      return this.search
        ? this.fruits.filter(
          fruit => fruit.name
            .toLowerCase()
              .includes(this.search.toLowerCase()),
        )
        : this.fruits;
    }
  },
  
  created() {
    this.fruit.get();
  },
};
</script>
```

3. In your single model component, you can rely on a respectful model using for your own purposes and even prop validation:

> FruitItem.vue

```
<template>
  <router-link :to="fruit.routerPath">
    Fruit Name: {{ fruit.name }}
    Fruit Eaten: {{ fruit.eaten }}
  </router-link>
</template>

<script>
import Fruit from '@/models/Fruit';

export default {
  name: 'FruitItem',
  
  props: {
    fruit: {
      type: Fruit,
      required: true,
      default: () => Fruit.empty(),
    },
  },
};
</script>
```

4. In your edit model form you can simply use it as a local set of variables encapsulated to your model object and when user is done editing, you can simply call `.create()` or `.update()` methods:

> PageFruitEdit.vue

```
<template>
  <div>
    <label>
      Name:
      <input v-model="fruit.name">
    </label>
    <button @click="fruit.update">
  </div>
</template>

<script>
import Fruit from '@/models/Fruit';

export default {
  name: 'PageFruitEdit',
  
  props: {
    fruit: {
      type: Fruit,
      required: true,
      default: () => Fruit.empty(),
    },
  },
};
</script>
```

## Contribution

Feel free to submit your pull-requests, ideas, proposals and bug reports!
 
### TODOs:
- Add dynamic query/mutation building based on model attributes w/o need to create `.graphql` files at all
- Make collections optional to make library more lightweight 
- Rewrite to TypeScript
- Add subscriptions & events example
- Write more tests & coverage support
- Add model versioning support
- Add a configurable operation confirmation when performing some risky operations. For example, automatically display a delete confirmation component when executing `.delete()` method.
