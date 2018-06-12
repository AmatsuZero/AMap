// @flow

import BaseRequestConfig from './BaseRequestConfig';

export default class GeoRequestConfig extends BaseRequestConfig {
  address: string;
  batch: boolean;
  city: string;

  constructor() {
    super();
    this.batch = false;
  }
  set addresses(newValue: string[]) {
    this.address = newValue.reduce((accumulator, currentValue, index) =>
      accumulator + (index === 0 ? '' : '|') + currentValue, '');
  }
  get addresses(): string[] {
    return this.address.split('|');
  }
}
