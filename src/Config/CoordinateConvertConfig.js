// @flow
import BaseRequestConfig from './BaseRequestConfig';
import GeoLocation from '../Response/GeoLocation';

export default class CoordinateConvertConfig extends BaseRequestConfig {
  _locations: GeoLocation[];
  coordsys: 'gps' | 'mapbar' | 'baidu' | 'autonavi';
  constructor() {
    super();
    this.coordsys = 'autonavi';
  }
  set locations(newValue: GeoLocation[]) {
    this._locations = newValue;
  }
  get locations(): GeoLocation[] {
    return this._locations;
  }
}
