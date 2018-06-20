// @flow

import BaseRequestConfig from '../BaseRequestConfig';
import GeoLocation from '../../Response/GeoLocation';

export default class TransitRequestConfig extends BaseRequestConfig {
  origin: GeoLocation;
  destination: GeoLocation;
  city: string;
  cityd: string;
  extension: 'base' | 'all';
  strategy: 0 | 1 | 2 | 3 | 5;
  nightflag: 0 | 1;
  _date: string;
  _time: string;
  constructor() {
    super();
    this.extension = 'base';
    this.strategy = 0;
    this.nightflag = 0;
    // 默认是当前时间
    this.date = new Date();
  }
  set date(newValue: Date) {
    this._date = newValue.toLocaleDateString().replace(/\//gi, '-');
    this._time = newValue.toLocaleTimeString('zh-Hans-CN', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
    });
  }
}
