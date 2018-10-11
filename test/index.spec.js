/* global describe, it, before */

import chai from 'chai';
import { BaseModel, Exceptions, Utils } from '../lib/vue-graphql-models.min';

chai.expect();

const expect = chai.expect;

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
