// @flow
import { Location } from '../Response';
import BaseRequestConfig from './BaseRequestConfig';

export default class RegeoRequestConfig extends BaseRequestConfig {
  location: string;
  batch: boolean;
  poitype: string;
  radius: number;
  roadlevel: 0 | 1;
  homeorcorp: 0 | 1 | 2;

  constructor() {
    super();
    this.batch = false;
    this.extensions = 'base';
    this.homeorcorp = 0;
  }
  set locations(newValue: Location[]) {
    this.location = newValue
      .map(val => val.toString())
      .reduce((accumulator, currentValue, index) => accumulator + (index === 0 ? '' : '|') + currentValue, '');
  }
  get locations(): Location[] {
    return this.location.split('|')
      .map(value => value.split(','))
      .map(value => new Location(value[0], value[1]));
  }
}
