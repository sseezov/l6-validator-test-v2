// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('task1', () => {
  const validator = new Validator();
  const schema = validator.string();

  assert.equal(schema.isValid(null), false);
  assert.equal(schema.isValid(''), true);
  assert.equal(schema.isValid(true), false);
  assert.equal(schema.isValid(123), false);
  assert.equal(schema.isValid(), false);
  assert.equal(schema.isValid('2'), true);
});

test('task2', () => {
  const v = new Validator();
  const schema = v.string().hasSpaces();

  assert.equal(schema.isValid([]), false);
  assert.equal(schema.isValid('[1, 2]'), true);
  assert.equal(schema.isValid(' '), true);
  assert.equal(schema.isValid('Hexlet'), false);
});

test('task3', () => {
  const v = new Validator();

  const schema1 = v.function();
  assert.equal(schema1.isValid(() => { }), true);
  assert.equal(schema1.isValid(console.log), true);
  assert.equal(schema1.isValid({}), false);

  const schema2 = v.function().expect('1');
  assert.equal(schema2.isValid(() => 1), false);
  assert.equal(schema2.isValid(() => '1'), true);

  const schema3 = v.function().callWith({ prop: '1' }).expect('1');
  assert.equal(schema3.isValid(() => '1'), true);
  assert.equal(schema3.isValid(() => 1), false);
  assert.equal(schema3.isValid(function test() { return this.prop; }), true);
});

test('task4', () => {
  const v = new Validator();
  const schema1 = v.function().arguments([1, 2, 3, 4, 5, 6, 7]).expect(1);

  assert.equal(schema1.isValid((args) => Math.min(...args)), true);
  assert.equal(schema1.isValid(() => 1), true);
  assert.equal(schema1.isValid(function p() { return this.prop; }), false);

  const schema2 = v.function().arguments([1, 2, 3, 4, 5, 6, 7]).expect(true).callWith({ prop: 2 });
  assert.equal(schema2.isValid(function p(args) { return args[1] === this.prop; }), true); // true;
  assert.equal(schema2.isValid(function p(args) { return args[2] === this.prop; }), false); // true;
});

test('task5', () => {
  const v = new Validator();

  const schema = v.object().shape({
    string: v.string(),
    obj: {
      func: v.function(),
      innerObj: {
        string: v.string().hasSpaces(),
        deepestObj: {
          func: v.function().arguments(['h', 'e', 'l', 'l', 'o']).expect('hell'),
        },
      },
    },
  });

  assert.equal(schema.isValid({
    string: '54',
    obj: {
      func: () => { },
      innerObj: {
        string: 'he he he',
        deepestObj: {
          func: (args) => args.slice(0, args.length - 1).join(''),
        },
      },
    },
  }), true);
});
