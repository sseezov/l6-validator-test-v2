export default class FunctionSchema {
  constructor(validators, context = {}, expectedValue = null, args = []) {
    this.validators = [...validators];
    this.context = context;
    this.expectedValue = expectedValue;
    this.args = args;
  }

  isValid(value) {
    if (!this.expectedValue) {
      return this.validators.every((validator) => validator(value) === true);
    }
    return value.call(this.context, ...this.args) === this.expectedValue;
  }

  expect(val) {
    return new FunctionSchema(this.validators, this.context, val, this.args);
  }

  callWith(obj) {
    return new FunctionSchema(this.validators, obj, this.expectedValue, this.args);
  }

  arguments(...args) {
    return new FunctionSchema(this.validators, this.context, this.expectedValue, args);
  }
}
