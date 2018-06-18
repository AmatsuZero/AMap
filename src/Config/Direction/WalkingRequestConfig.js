// @flow

import BaseRequestConfig from '../BaseRequestConfig';
import GeoLocation from '../../Response/GeoLocation';

export default class WalkingRequestConfig extends BaseRequestConfig {
  origin: GeoLocation;
  destination: GeoLocation;
}
