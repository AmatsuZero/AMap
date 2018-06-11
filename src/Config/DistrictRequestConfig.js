// @flow

export default class DistrictRequestConfig {
  keywords: string;
  subdistrict: 0 | 1 | 2 | 3;
  page: number;
  offset: number;
  filter: string;
  callback: string;
  outpuut: 'XML' | 'JSON';
  extensions: 'base' | 'all';

  constructor() {
    this.subdistrict = 1;
    this.page = 1;
    this.offset = 20;
    this.extensions = 'base';
    this.outpuut = 'JSON';
  }
}
