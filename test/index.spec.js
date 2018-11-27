/* global describe, it, before */

import chai from 'chai';
import Vue from 'vue';
import chaiFetchMock from 'chai-fetch-mock';
import fetchMock from 'fetch-mock';
import VueGraphqlModels, { BaseModel, Exceptions, Utils } from '../src/index';

Vue.use(VueGraphqlModels, {
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
        foo: 'bar',
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
        a: 1,
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

      expect(res).to.be.eql({});
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
});
