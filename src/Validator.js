import FunctionSchema from './FunctionSchema.js';
import ObjectSchema from './ObjectSchema.js';
import StringSchema from './StringSchema.js';

export default class Validator {
  string() {
    return new StringSchema([(val) => typeof val === 'string']);
  }

  function() {
    return new FunctionSchema([(val) => typeof val === 'function']);
  }

  object() {
    return new ObjectSchema();
  }
}
