// @flow

export default class WeatherRequestConfig {
  city: string;
  extensions: 'base' | 'all';
  output: 'JSON' | 'XML';
  constructor() {
    this.extensions = 'base';
    this.output = 'JSON';
  }
}
