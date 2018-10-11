/* global describe, it, before */

import chai from 'chai';
import { BaseModel, Exceptions } from '../lib/vue-graphql-models.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my BaseModel library', () => {
  before(() => {
    lib = new BaseModel();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('BaseModel');
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
