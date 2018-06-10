// @flow

export default class IPServiceRequestConfig {
  ip: string;
  sig: string;
  output: 'XML' | 'JSON';
  constructor() {
    this.output = 'JSON';
  }
}
