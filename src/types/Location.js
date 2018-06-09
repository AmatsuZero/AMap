// @flow
export default class Location {
    lon: number;
    lat: number;
    constructor(lon: number | string, lat: number | string) {
      this.lon = Number.parseFloat(`${lon}`);
      this.lat = Number.parseFloat(`${lat}`);
    }
    static fromString(str: string): Location {
      const loc = str.split(',');
      return new Location(loc[0], loc[1]);
    }
}
