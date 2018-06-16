// @flow
import { GeoLocation } from '../Response';
import BaseRequestConfig from './BaseRequestConfig';

export default class RegeoRequestConfig extends BaseRequestConfig {
  _location: GeoLocation[];
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
  set location(newValue: GeoLocation[]) {
    this._location = newValue;
  }
  get location(): GeoLocation[] {
    return this._location;
  }
}
