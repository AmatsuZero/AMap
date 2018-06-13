// @flow

import BaseRequestConfig from './BaseRequestConfig';

export default class GeoRequestConfig extends BaseRequestConfig {
  _address: string[];
  batch: boolean;
  city: string;

  constructor() {
    super();
    this.batch = false;
  }
  set address(newValue: string[]) {
    this._address = newValue;
  }
  get address(): string[] {
    return this._address;
  }
}
