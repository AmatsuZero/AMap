// @flow

import BaseRequestConfig from './BaseRequestConfig';

export default class DistrictRequestConfig extends BaseRequestConfig {
  keywords: string;
  subdistrict: 0 | 1 | 2 | 3;
  page: number;
  offset: number;
  filter: string;

  constructor() {
    super();
    this.subdistrict = 1;
    this.page = 1;
    this.offset = 20;
    this.extensions = 'base';
  }
}
