export default class StringSchema {
  constructor(validators = []) {
    const defaultValidator = [(str) => typeof str === 'string'];
    this.validators = [...defaultValidator, ...validators];
  }

  isValid(str) {
    return this.validators.every((validator) => validator(str));
  }

  hasSpaces() {
    const validator = [(str) => (/[' ']/).test(str)];
    this.validators = [...this.validators, ...validator];
    return new StringSchema(validator);
  }
}
