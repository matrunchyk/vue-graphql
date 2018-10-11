# Vue GraphQL Models

Universal library which helps to build OOP-driven GraphQL based models for Vue components.
Influenced by Laravel Eloquent Models & Collections.

![Travis](https://travis-ci.org/digitalidea/vue-graphql-models.svg?branch=master)

## Features

* `BaseModel` is a class which acts as a base entity for your future models extending this class.
* Full encapsulation of GraphQL queries & mutations. No need to call them manually, all you need is to call you Model's `.get()` or `.find()` methods.
* All arrays retrieved from GraphQL will be hydrated with respectful collections of models.
* Supports lazy-loading of GraphQL documents.
* Supports evens & hooks for customization.
* Has built-in FormWizard factory so you can create simple or complex Forms.  
* Webpack 4 based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Installation

`npm i vue-graphql-models -S`

or

`yarn add vue-graphql-models`

## Usage

1. Create a new Model which you want to use in your Vue component, i.e. `Fruit` by extending the imported `BaseModel` class:
> Fruit.js
```
import BaseModel from 'vue-graphql-models';

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
    fruits: Fruit.emptyCollection(),
    search: '',
  }),
  
  computed: {
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
    this.assets = await Fruit.get();
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

## Example

See [example](https://github.com/digitalideastudio/vue-graphql-models-example) how to use this package.

## Contribution

Feel free to submit your pull-requests, ideas, proposals and bug reports!
 
### TODOs:
- Add CodeSandbox example
