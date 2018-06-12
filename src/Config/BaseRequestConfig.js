// @flow

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
}
