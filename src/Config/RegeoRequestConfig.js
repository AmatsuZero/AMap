// @flow
import { Location } from '../Response';
import BaseRequestConfig from './BaseRequestConfig';

export default class RegeoRequestConfig extends BaseRequestConfig {
  _location: Location[];
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
  set location(newValue: Location[]) {
    this._location = newValue;
  }
  get location(): Location[] {
    return this._location;
  }
}
