# DEPRECATED
Migrated to [vue-opp](https://github.com/matrunchyk/vue-oop) as a part of it! :tada:

# Vue GraphQL Models

Universal library which helps to build OOP-driven GraphQL based models for Vue components.
Influenced by Laravel Eloquent Models & Collections.


[![npm](https://img.shields.io/npm/v/vue-graphql-models.svg)](https://www.npmjs.com/package/vue-graphql-models) [![GitHub stars](https://img.shields.io/github/stars/digitalideastudio/vue-graphql-models.svg)](https://github.com/digitalideastudio/vue-graphql-models/stargazers)
![Travis](https://api.travis-ci.org/digitalideastudio/vue-graphql-models.svg?branch=master) [![codecov](https://codecov.io/gh/digitalideastudio/vue-graphql-models/branch/master/graph/badge.svg)](https://codecov.io/gh/digitalideastudio/vue-graphql-models) [![GitHub license](https://img.shields.io/github/license/digitalideastudio/vue-graphql-models.svg)](https://github.com/digitalideastudio/vue-graphql-models/blob/master/LICENSE) 

_Note. If you looking for v1 of this library, switch to a [relevant branch](https://github.com/digitalideastudio/vue-graphql-models/tree/v1)._ 


## Features

* `BaseModel` is a class which acts as a base entity for your models extending this class.
* Full encapsulation of GraphQL queries & mutations. No need to call them manually, all you need is to call you Model's methods.
* All arrays retrieved from GraphQL will be hydrated with respectful collections of models.
* Supports lazy-loading of GraphQL documents.
* Supports events & hooks for customization.

###### Internally:  
* Webpack 4 based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## Installation

`npm i vue-graphql-models -S`

or

`yarn add vue-graphql-models`

## Configuration

```
import VueGraphqlModels from 'vue-graphql-models';

Vue.use(VueGraphqlModels);
```

## Documentation

### Basic Usage
#### 1. Define your model:

```
import { BaseModel } from 'vue-graphql-models';

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

####[Full Documentation](https://digitalideastudio.github.io/vue-graphql-models/#/)

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
