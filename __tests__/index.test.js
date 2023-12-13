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

  assert.equal(schema1.isValid(()=>{}), true);
  assert.equal(schema1.isValid({}), false);
  assert.equal(schema1.isValid(console.log), true);

  const schema2 = v.function().expect('1')
  assert.equal(schema2.isValid([[1], [2]]), false);
  assert.equal(schema2.isValid(()=>1), false);
  assert.equal(schema2.isValid(()=>{return '1'}), true);
});

test('task4', () => {
  const v = new Validator();
  const schema = v.function().arguments(1, 2, 3, 4, 5, 6, 7).expect(1); 

  assert.equal(schema.isValid({ num: 54, array: [1, 2, 3, 5, 65, 2] }), true);
  assert.equal(schema.isValid({ num: 2, array: [1, 2, '4'] }), false);
});

test('task5', () => {
  const v = new Validator();

  const schema = v.object().shape({
    num: v.number(),
    obj: {
      array: v.array().allIntegers(),
      innerObj: {
        num: v.number(),
        deepestObj: {
          num: v.number(),
        },
      },
    },
  });

  assert.equal(schema.isValid({ 
    string: '54', 
      obj: { 
        func: ()=>{}, 
        innerObj: { string: 'he he he', 
          deepestObj: { 
            func: (arg) => arg.slice(0, arg.length-2)
          }
        }
      }
  }), true);
  assert.equal(schema.isValid({ num: 54, obj: { array: [1, 2], innerObj: { num: 2, deepestObj: { num: 'gg' } } } }), false);
});
