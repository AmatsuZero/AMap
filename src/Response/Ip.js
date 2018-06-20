// @flow
import GeoLocation from './GeoLocation';

export default class {
    city: string;
    adcode: string;
    rectangle: Array<GeoLocation>;

    constructor(resp: Object) {
      this.city = resp.city;
      this.adcode = resp.adcode;
      this.rectangle = resp.rectangle.split(';')
        .map(location => GeoLocation.fromString(location));
    }
}
