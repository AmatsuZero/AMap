// @flow

const fromArray = (array: Object[], separator: string = '|'): string => array
  .map(value => value.toString())
  .reduce((accumulator, currentValue, currentIndex) =>
    (currentIndex === 0
      ? accumulator + currentValue
      : `${accumulator}${separator}${currentValue}`), '');

export default class BaseRequestConfig {
  sig: string;
  output: 'XML' | 'JSON';
  callback: string;
  extensions: 'base' | 'all';

  constructor() {
    this.output = 'JSON';
  }
  sign(privateKey: string) {
    const obj: Object = this; // To cheat the flow check
    this.sig = Object.keys(obj)
      .sort()
      .reduce(((previousValue, currentValue, currentIndex, array) => {
        let value = previousValue;
        if (currentIndex === 0) {
          value += `${currentValue}=${obj[currentValue]}`;
        } else {
          value += `&${currentValue}=${obj[currentValue]}`;
        }
        if (currentIndex === array.length - 1) { value += `${privateKey})`; }
        return value;
      }), 'sig=md5(');
  }
  toParameter(): Object {
    const obj: Object = this; // To cheat the flow check
    const parameters = {};
    Object.keys(obj).forEach((key) => {
      const newKey = key.startsWith('_') ? key.substring(1, key.length) : key;
      const value = obj[key];
      if (Array.isArray(value)) {
        parameters[newKey] = fromArray(value);
      } else {
        parameters[newKey] = typeof value === 'object' ? value.toString() : value;
      }
    });
    return parameters;
  }
}
