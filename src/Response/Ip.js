// @flow
import Location from './Location';

export default class {
    city: string;
    adcode: string;
    rectangle: Array<Location>;

    constructor(resp: Object) {
      this.city = resp.city;
      this.adcode = resp.adcode;
      this.rectangle = resp.rectangle.split(';')
        .map((location) => {
          const loc = location.split(',');
          return new Location(loc[0], loc[1]);
        });
    }
}
