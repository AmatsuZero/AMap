// @flow
import { Location } from '../Response';

export default class RegeoRequestConfig {
  location: string;
  batch: boolean;
  poitype: string;
  sig: string;
  callback: string;
  radius: number;
  extensions: 'base' | 'all';
  roadlevel: 0 | 1;
  homeorcorp: 0 | 1 | 2;
  output: 'JSON' | 'XML';
  constructor() {
    this.batch = false;
    this.extensions = 'base';
    this.homeorcorp = 0;
    this.output = 'JSON';
  }
  set locations(newValue: Location[]) {
    this.location = newValue
      .map(val => val.stringValue)
      .reduce((accumulator, currentValue, index) => accumulator + (index === 0 ? '' : '|') + currentValue, '');
  }
  get locations(): Location[] {
    return this.location.split('|')
      .map(value => value.split(','))
      .map(value => new Location(value[0], value[1]));
  }
}
