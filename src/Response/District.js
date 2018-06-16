// @flow

import GeoLocation from './GeoLocation';

class Suggestion {
  keywords: string[];
  cities: string[];
  constructor(prop: Object) {
    this.keywords = prop.keywords;
    this.cities = prop.cities;
  }
}

class District {
  citycode: string;
  adcode: string;
  name: string;
  polyline: GeoLocation[];
  center: ?GeoLocation;
  level: 'country' | 'province' | 'city' | 'district' | 'street';
  districts: District[];
  constructor(prop: Object) {
    this.citycode = prop.citycode;
    this.adcode = prop.adcode;
    this.name = prop.name;
    this.polyline = prop.polyline !== undefined && prop.polyline.length > 0
      ? prop.polyline.split(';').map(value => GeoLocation.fromString(value))
      : [];
    this.center = prop.center !== undefined ? GeoLocation.fromString(prop.center) : null;
    this.districts = prop.districts !== undefined && Array.isArray(prop.districts)
      ? prop.districts.map(value => new District(value))
      : [];
  }
}

export default class DistrictResponse {
  suggestion: Suggestion[];
  districts: District[];
  constructor(prop: Object) {
    this.suggestion = prop.suggestion;
    this.districts = prop.districts !== undefined && Array.isArray(prop.districts)
      ? prop.districts.map(value => new District(value))
      : [];
  }
}
