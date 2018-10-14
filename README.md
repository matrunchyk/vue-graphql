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

## Basic Usage

Intro:
- Usually website or webapp consists from a page with list of models (list of products, list of categories, list of any other models) as well as page with a single items (or multiple items). The item here is called as `model` and the list of items is a `collection` of `models`.
- When Vue component is rendering, it usually doesn't have data yet. To avoid errors, we can substitute an empty `Collection` by just using model's method `.emptyCollection()`. To have the same effect for empty model, you can use `.empty()`.
- You can specify your model class in your Vue component's prop validation.
- Each collection has the same methods as Laravel Collection class (credits to [collect.js](https://github.com/ecrmnn/collect.js/))
- Each model can obtain data using specific GraphQL queries and mutations. The only requirement is a folder structure (which is also great to avoid various mistakes and always keep a consistency).
- Each model can have default values for its properties
- Properties can be automatically converted to other objects, for example, array values can be automatically converted to a subcollection of other models.   

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

## How to use build an application Menu

- Menu is driven by `MenuItem` and `MenuRepository` models.
- Each route in your app can have its own set of menu items.
- In this library `MenuRepository` pattern is used so first you'l have to create sets of items in your repository for further use.
- Items can be combined in groups (recommended approach).
- In your route declarations you can specify which group to use.

1. In order to create a menu repository, create a folder `src/menu/categories` folder. Here will be stored menu categories which will help you to distinguish menu items for further using them in groups (pages). For example, your website has Products and Customers pages, so it's recommended to create two files: `products.js` and `customers.js`. Each file contains a list of `MenuItem`s:
    > src/menu/categories/products.js
    ```
    import { MenuItem } from 'vue-graphql-models';
    
    export default [
      new MenuItem({
        id: 'productCreate',
        title: 'Create Product',
        subtitle: 'Create a new product',
        icon: 'product_new',
      }),
      new MenuItem({
        id: 'productDelete',
        title: 'Delete Product',
        subtitle: 'Deletes the product',
        icon: 'trash',
      }),
      new MenuItem({
        id: 'productEdit',
        title: 'Edit Product',
        subtitle: 'Edit the product',
        icon: 'pencil',
      }),
      new MenuItem({
        id: 'categoryCreate',
        title: 'Create Category',
        subtitle: 'Create a new category',
        icon: 'create_new_folder',
      }),
      // .. all possible product-related items
    ];
    ```
2. Build your menu repository using all these categories defined in previous step:
    > src/menu/MenuRepository.js
    ```
    import { MenuRepository as BaseMenuRepository } from 'vue-graphql-models';
    
    import products from '@/menu/categories/products';
    import customers from '@/menu/categories/customers';
    
    const MenuRepository = new BaseMenuRepository([
      ...products,
      ...customers,
    ]);
    
    export default MenuRepository;
    ```

3. Since you already have a menu repository with all conveniently categorized items, now you can create menu groups to referring to them in your `vue-route`'s route definition files. You can create as many menu groups as you want. Create a folder `src/menu/groups` where all menu groups to be kept. A few examples of a group files:
    > src/menu/groups/productList.js
    ```
    import MenuRepository from '../../MenuRepository';
    
    export default [
      MenuRepository.productCreate,
      MenuRepository.categoryCreate,
      MenuRepository.productHelp,
    ];
    ```
    
    > src/menu/groups/customerList.js
    ```
    import MenuRepository from '../../MenuRepository';
    
    export default [
      MenuRepository.customerCreate,
      MenuRepository.customerOrders,
      MenuRepository.customerCarts,
      MenuRepository.customerHelp,
    ];
    ```
4. Since you can have even more than 1 menu, it's better to create a folder per each menu, so the whole structure would look like the following:
    ```
    /src
      |
     menu
      |
      |- MenuRepository.js
      |
      |- categories
      |    |
      |    |- products.js
      |    |- customers.js
      |    |- ...
      |
      |- groups
      |    |
      |    |- productList.js
      |    |- productPage.js
      |    |- customerList.js
      |    |- customerPage.js
      |    |- helpPage.js
      |    |- ...
      |
      |- leftMenu.js
      |- topMenu.js
      |- otherMenu.js
      |- ...
    ```  
    
    For example, how `leftMenu.js` would look like:
    ```
    import productList from './groups/productList';
    import productPage from './groups/productPage';
    import customerList from './groups/customerList';
    import customerPage from './groups/customerPage';
    
    export default {
      productList,
      productPage,
      customerList,
      customerPage,
    }
    ```
    
    and how `topMenu` would look like:
    ```
    import helpPage from './groups/helpPage';
    import otherPage from './groups/otherPage';
    import profilePage from './groups/profilePage';
    import systemPage from './groups/systemPage';
    
    export default {
      helpPage,
      otherPage,
      profilePage,
      systemPage,
    }
    ```

5. Whew! Almost done. Now all you need is just add a reference to a particular route definition:
    > src/router/routes/productList.js
    ```
    import { Util } from 'vue-graphql-models';
    import { leftMenu } from '@/menu/leftMenu';
    
    export default {
      path: '/products',
      component: Util.getView('productList'),
      name: 'products',
      meta: {
        leftMenu: leftMenu.productList,
      },
    };
    ```
    
    Alternatively, you can skip step 4 and use it directly like this:
    > src/router/routes/productList.js
    ```
    import { Util } from 'vue-graphql-models';
    import productList from '@/menu/groups/productList';
    
    export default {
      path: '/products',
      component: Util.getView('productList'),
      name: 'products',
      meta: {
        leftMenu: productList,
      },
    };
    ```

6. Congrats! Now your each route can have its own menu!
    
    BONUS TIP: If you are curious how to use it in your app, here is an example of component in Vuetify:
    > LeftMenuDrawer.vue
    ```
    <template>
      <ul
        subheader
        three-line
        class="grey lighten-4"
      >
        <v-list-tile
          v-for="(item, index) in menuItems"
          :key="index"
          v-bind="item.getBoundProps()"
          avatar
          active-class="grey--text text--darken-2"
          class="grey--text text--darken-2 grey lighten-4"
          v-on="item.boundListeners"
        >
          <v-list-tile-action>
            <i
              v-if="item.hasCustomIcon()"
              :class="item.icon"
              class="i custom-icon"
            />
            <v-icon
              v-else
              large
            >
              {{ item.icon }}
            </v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title
              class="subheading"
            >
              {{ item.title }}
            </v-list-tile-title>
            <v-list-tile-sub-title
              class="body-1"
            >
              {{ item.subtitle }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </template>
    
    <script>
    export default {
      name: 'LeftMenuDrawer',
      
      menuItems() {
        const menuItems = this.$route.meta.leftMenu || [];
        
        if (!menuItems.filter) {
          console.group('DEBUG: menuItems.filter is not a function');
          console.log(menuItems);
          console.groupEnd();
        }

        const validItems = menuItems.filter(item => item);
        const invalidCount = menuItems.length - validItems.length;
        
        if (invalidCount) {
          const isAre = invalidCount > 1 ? 'are' : 'is';
          console.warn(`Warning: ${invalidCount} of ${menuItems.length} menu items for current route ${isAre} invalid.`);
        }
        
        return validItems;
      },
    };
    </script>
    ```


## Example

See [example](https://github.com/digitalideastudio/vue-graphql-models-example) how to use this package.

[![Edit Vue Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n01pz0z470)

Note: It seems like CodeSandbox doesn't have Lazy Loading support. CodeSandbox still WIP, though you can visually see how the library _could_ be utilized.  

## Contribution

Feel free to submit your pull-requests, ideas, proposals and bug reports!
 
### TODOs:
- ~~Add CodeSandbox example~~
- ~~Add Launchpad example for lazy folks~~
- Add even more speed & optimization & caching
- Rewrite to TypeScript
- Add subscriptions & events example
- Add menu event hooks example
- Write more tests & coverage support
