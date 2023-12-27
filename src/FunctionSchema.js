export default class FunctionSchema {
  constructor(validators = [], context = {}, args = []) {
    const defaultValidator = [(str) => typeof str === 'function'];
    this.validators = [...defaultValidator, ...validators];
    this.context = context;
    this.args = args;
  }

  isValid(func) {
    return this.validators.every((validator) => validator(func));
  }

  arguments(args) {
    return new FunctionSchema([...this.validators], this.props, args);
  }

  expect(data) {
    const validator = [(str) => str.call(this.context, this.args) === data];
    this.validators = [...this.validators, ...validator];
    return new FunctionSchema(this.validators);
  }

  callWith(props) {
    return new FunctionSchema([...this.validators], props);
  }
}
