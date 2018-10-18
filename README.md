# Vue GraphQL Models

Universal library which helps to build OOP-driven GraphQL based models for Vue components.
Influenced by Laravel Eloquent Models & Collections.

![Travis](https://api.travis-ci.org/digitalideastudio/vue-graphql-models.svg?branch=master)

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

`npm i vue-graphql-models -S`

or

`yarn add vue-graphql-models`

## Configuration

```
import VueGraphqlModels from 'vue-graphql-models';
// import createProvider, { cachePersistor } from 'Lib/vue-apollo';

Vue.use(VueGraphqlModels, {
  // debug: true,
  // cachePersistor,
  dataLoader(path) {
    return import(/* webpackChunkName: "data/[request]" */ `Data/${path}`);
  },
  modelLoader(path) {
    return import(/* webpackChunkName: "models/[request]" */ `Models/${path}`);
  },
  gqlLoader(path) {
    return import(/* webpackChunkName: "gql/[request]" */ `Gql/${path}.graphql`);
  },
});
```

## Documentation

Please see GitHub pages [documentation](https://digitalideastudio.github.io/vue-graphql-models/#/) for more details.

## Contribution

Feel free to submit your pull-requests, ideas, proposals and bug reports!
 
### TODOs:
- ~~Add CodeSandbox example~~
- ~~Add Launchpad example for lazy folks~~
- ~~Create github.io pages with a whole documentation & examples~~
- ~~Add relationship support between models (e.g attach/detach)~~
- ~~Add even more speed & optimization & caching~~
- Rewrite to TypeScript
- Add subscriptions & events example
- Add menu event hooks example
- Write more tests & coverage support
- Add model versioning support
- ~~Add validation of dynamic fields~~
- Create MenuDrawer component
- Add a configurable operation confirmation when performing some risky operations. For example, automatically display a delete confirmation component when executing `.delete()` method.
