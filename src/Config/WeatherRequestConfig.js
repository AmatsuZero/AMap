// @flow

import BaseRequestConfig from './BaseRequestConfig';

export default class WeatherRequestConfig extends BaseRequestConfig {
  city: string;

  constructor() {
    super();
    this.extensions = 'base';
  }
}
