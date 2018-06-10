// @flow

export default class GeoRequestConfig {
  address: string;
  batch: boolean;
  city: string;
  sig: string;
  callback: ?string;
  output: 'XML' | 'JSON';
  constructor() {
    this.batch = false;
    this.output = 'JSON';
  }
  set addresses(newValue: string[]) {
    this.address = newValue.reduce((accumulator, currentValue, index) =>
      accumulator + (index === 0 ? '' : '|') + currentValue, '');
  }
  get addresses(): string[] {
    return this.address.split('|');
  }
}
