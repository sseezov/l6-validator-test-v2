export default class StringSchema {
  constructor(vals) {
    this.validators = [...vals];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value) === true);
  }

  hasSpaces() {
    const validator = (string) => string.includes(' ');
    return new StringSchema([...this.validators, validator]);
  }
}
