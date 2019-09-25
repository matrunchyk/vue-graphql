/* global describe, it, before */

import chai from 'chai';
import Vue from 'vue';
import chaiFetchMock from 'chai-fetch-mock';
import fetchMock from 'fetch-mock';
import VueGraphql, { BaseModel, Exceptions, Utils } from '../src/index';

Vue.use(VueGraphql, {
  dataLoader(path) {
    return import(/* webpackChunkName: "data/[request]" */ `Data/${path}`);
  },
  modelLoader(path) {
    return import(/* webpackChunkName: "models/[request]" */ `Models/${path}`);
  },
  gqlLoader(path) {
    return import(/* webpackChunkName: "gql/[request]" */ `Gql/${path}.graphql`);
  }
});

chai.expect();

const expect = chai.expect;

chai.use(chaiFetchMock);

let lib;

console.log(`Library version: ${Utils.version()}`);

describe('Given an instance of my BaseModel library', () => {
  before(() => {
    lib = new BaseModel();
  });
  describe('when I need the __typename', () => {
    it('should return the __typename', () => {
      expect(lib.__typename).to.be.equal('BaseModel');
    });
  });
});

describe('Given an instance of my Model based on BaseModel', () => {
  before(() => {
    class MyModel extends BaseModel {
      __typename = 'MyModel';
    }

    lib = new MyModel();
  });
  describe('when I override with the __typename', () => {
    it('should return the overriden __typename', () => {
      expect(lib.__typename).to.be.equal('MyModel');
    });
  });
});

describe('Given an instance of my InvalidArgumentException library', () => {
  before(() => {
    lib = new Exceptions.InvalidArgumentException('This is a message');
  });
  describe('when I need the message', () => {
    it('should return the message', () => {
      expect(lib.message).to.be.equal('This is a message');
    });
  });
});

describe('Given Utils object', () => {
  describe('when I check whether it is a debug mode', () => {
    it('should return undefined', () => {
      expect(Utils.isDebug()).to.be.false;
    });
  });
  describe('when I check whether it is a mobile', () => {
    it('should return false', () => {
      expect(Utils.isMobile()).to.be.false;
    });
  });
  describe('when I pass a string in lowercase', () => {
    it('should return upper-cased words', () => {
      expect(Utils.ucwords('This IS a TEST')).to.be.equal('This IS A TEST');
    });
  });
  describe('when I pass a string in mixed case', () => {
    it('should return string with lower case of 1st word', () => {
      expect(Utils.lowerCaseFirst('THIS IS a TEST')).to.be.equal('tHIS IS a TEST');
    });
  });
  describe('when I pass number', () => {
    it('should return converted bytes to human readable string', () => {
      expect(Utils.humanBytes(123)).to.be.equal('123.00 B');
      expect(Utils.humanBytes(1024 ** 2)).to.be.equal('1.00 MB');
      expect(Utils.humanBytes(1024 ** 5)).to.be.equal('1.00 PB');
      expect(Utils.humanBytes((1024 ** 1) * 1.23)).to.be.equal('1.23 KB');
      expect(Utils.humanBytes((1024 ** 2) * 7.766666)).to.be.equal('7.77 MB');
      expect(Utils.humanBytes(0)).to.be.equal('0.00 B');
    });
  });
  describe('when I pass url and data', () => {
    it('should make http post and retrieve a json value', async () => {
      const examplePost = {
        foo: 'bar'
      };

      fetchMock.post('https://example.com', examplePost);
      const jsonResult = await Utils.httpPost('https://example.com', examplePost);

      expect(JSON.stringify(jsonResult)).to.be.equal(JSON.stringify(examplePost));
      fetchMock.restore();
    });
  });
  describe('when I pass loader function and path', () => {
    it('should return a GQL document', async () => {
      const obj = {
        a: 1
      };
      const doc = { fetchPost: obj };
      const loader = () => Promise.resolve(doc);
      const res = await Utils.getGQLDocument(loader, 'posts/queries/fetchPost');

      expect(res).to.be.equal(obj);
    });
  });
  describe('when I pass loader function (which fails) and path', () => {
    it('should return a stubbed GQL document', async () => {
      const loader = () => Promise.reject();
      const res = await Utils.getGQLDocument(loader, 'posts/queries/fetchPost');

      expect(res).to.be.eql({__fake: true});
    });
  });
  describe('when I pass class name and arguments', () => {
    it('should return a new class isntance with parameters', () => {
      class Dynamic {
        constructor(param1, param2) {
          this.testProp = 'testVal';
          this.param1 = param1;
          this.param2 = param2;
        }
      }

      const dyn = Utils.spawn(Dynamic, ['A', 'B']);

      expect(dyn).to.be.an.instanceof(Dynamic);
      expect(dyn.param1).to.be.equal('A');
      expect(dyn.param2).to.be.equal('B');
      expect(dyn.testProp).to.be.equal('testVal');
    });
  });
  describe('when I pass some original object', () => {
    it('should return a new cloned object ', () => {
      const original = {
        a: 1,
        b: 2,
        c: {
          d: '1'
        },
        e: ['f', 'g', { h: 1 }]
      };
      const cloned = Utils.cloneDeep(original);

      expect(cloned).to.be.eql(original);
      expect(cloned).to.be.not.equal(original);
    });
  });
  describe('when I pass some original object with __typename', () => {
    it('should return a new cloned object without __typename', () => {
      const original = {
        __typename: 'TypeA',
        a: 1,
        b: 2,
        c: {
          __typename: 'TypeB',
          d: '1'
        },
        e: ['f', 'g', { h: 1, __typename: 'TypeC' }]
      };
      const cloned = Utils.stripTypename(original);

      expect(cloned).to.be.not.eql(original);
      expect(cloned).to.be.not.equal(original);
      expect(cloned.a).to.be.equal(original.a);
      expect(cloned.__typename).to.be.equal(undefined);
      expect(cloned.b).to.be.equal(original.b);
      expect(cloned.c.d).to.be.equal(original.c.d);
      expect(cloned.c.__typename).to.be.equal(undefined);
      expect(cloned.e[0]).to.be.equal(original.e[0]);
      expect(cloned.e[1]).to.be.equal(original.e[1]);
      expect(cloned.e[2].h).to.be.equal(original.e[2].h);
      expect(cloned.e[2].__typename).to.be.equal(undefined);
    });
  });
  describe('when I pass Vue-router route object', () => {
    it('should return a merged meta object for all matched route objects', () => {
      const route = {
        matched: [
          { meta: { a: 1, b: 2 } },
          { meta: { c: 4, b: 3 } }
        ]
      };
      const metas = Utils.findRouteMetas(route);

      expect(metas.a).to.be.equal(1);
      expect(metas.b).to.be.equal(3);
      expect(metas.c).to.be.equal(4);
    });
  });
  describe('when I pass two arrays', () => {
    it('should return an array of items matched in both arrays', () => {
      expect(Utils.intersect([], [])).to.be.eql([]);
      expect(Utils.intersect([123, 456], [])).to.be.eql([]);
      expect(Utils.intersect([123, 456, 789], [789, 123])).to.be.eql([123, 789]);
    });
  });
  describe('when I pass an array to sort and sort keys with its directions', () => {
    it('should return sorted array of objects by given sort options w/o mutating the original', () => {
      expect(Utils.sortBy([
        { weight: 1 },
        { weight: 3 },
        { weight: 2 },
        { weight: 10, name: 'ttt' },
        { weight: 8 },
        { name: 'bbb' },
        { weight: 0, name: 'aaa' },
        { weight: 10, name: 'lll' },
        { weight: 9 }
      ], { weight: 'desc', name: 'asc' })).to.be.eql([
        { weight: 10, name: 'lll' },
        { weight: 10, name: 'ttt' },
        { weight: 9 },
        { weight: 8 },
        { weight: 3 },
        { weight: 2 },
        { weight: 1 },
        { weight: 0, name: 'aaa' },
        { name: 'bbb' }
      ]);
    });
  });

  // findRecursive
  describe('when I pass function parameters', () => {
    it('should return a found object in array of objects recursively by object key', () => {
      expect(Utils.findRecursive([
        {
          id: 123,
          name: 'Test 1',
          entries: []
        },
        {
          id: 456,
          name: 'Test 2',
          entries: [
            {
              id: 789,
              name: 'Test 3',
              entries: []
            }
          ]
        }
      ], 'id', 789)).to.be.eql({ id: 789, name: 'Test 3', entries: [] });
    });
    expect(Utils.findRecursive([
      {
        id: 123,
        name: 'Test 1',
        files: []
      },
      {
        id: 456,
        name: 'Test 2',
        files: [
          {
            id: 789,
            name: 'Test 3',
            files: []
          }
        ]
      }
    ], 'id', 789, 'files')).to.be.eql({ id: 789, name: 'Test 3', files: [] });
  });

  // pick
  describe('when I pass a source object and keys to select', () => {
    it('should return selected items from the object', () => {
      expect(Utils.pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).to.be.eql({ a: 1, c: 3 });
      expect(Utils.pick({ a: 1, b: 2, c: 3 }, ['a', 'd'])).to.be.eql({ a: 1 });
      expect(Utils.pick({ a: 1, b: 2, c: 3 }, [])).to.be.eql({});
      expect(Utils.pick({ a: 1, b: 2, c: { d: 1 } }, ['c'])).to.be.eql({ c: { d: 1 } });
    });
  });

  // getGQLDocumentName
  describe('when I pass GQL document and calling class', () => {
    it('should return a document name of GraphQL document', () => {
      const fakeGQLDoc = {
        definitions: [
          { kind: 'SomethingElse', name: { value: 'SomethingElse' } },
          { kind: 'OperationDefinition', name: { value: 'FakeDefinition' } },
          { kind: 'SomethingElse', name: { value: 'SomethingElse' } }
        ]
      };

      expect(Utils.getGQLDocumentName(fakeGQLDoc)).to.be.equal('FakeDefinition');
    });
    it('should throw an exception if wrong document', () => {
      const fakeGQLDoc = {
        definitions: [
          { kind: 'SomethingElse', name: { value: 'SomethingElse' } },
          { kind: 'OperationDefinition', name: { value: 'FakeDefinition' } },
          { kind: 'SomethingElse', name: { value: 'SomethingElse' } }
        ]
      };

      expect(Utils.getGQLDocumentName(fakeGQLDoc)).to.be.equal('FakeDefinition');
    });
  });

  // defineProperties
  describe('when I pass a source and destination objects', () => {
    it('should define a new or modify existing properties directly on an object', () => {
      const source = {
        b: 11,
        set theB(val) {
          this.b = val;
        },
        get theB() {
          return this.b;
        },
      };
      const destination = {};

      Utils.defineProperties(source, destination);
      destination.theB = 123;

      expect(destination.theB).to.be.equal(123);
    });
  });

  // sleep
  describe('when I pass number of seconds to wait', () => {
    it('should run a function when seconds passed', async () => {
      let test = false;

      window.setTimeout(() => {
        expect(test).to.be.equal(false);
      }, 1500);
      await Utils.sleep(1.5);
      test = true;
      expect(test).to.be.equal(true);
    });
  });
});

describe('Given VueGraphqlModels object', () => {
});
