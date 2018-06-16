// @flow

const EARTH_RADIUS = 6378.137;// 地球半径  人类规定(单位：m)
const rad = d => (d * Math.PI) / 180;
export default class GeoLocation {
    lon: number;
    lat: number;
    constructor(lon: number | string, lat: number | string) {
      this.lon = Number.parseFloat(`${lon}`);
      this.lat = Number.parseFloat(`${lat}`);
    }
    static fromString(str: string): GeoLocation {
      const loc = str.split(',');
      return new GeoLocation(loc[0], loc[1]);
    }
    toString() {
      return `${this.lon},${this.lat}`;
    }
    distance(to: GeoLocation): number {
      const radLat1 = rad(this.lat);
      const radLat2 = rad(to.lat);
      const a = radLat1 - radLat2;
      const b = rad(this.lon) - rad(to.lon);
      let s = 2 * Math.asin(Math.sqrt((Math.sin(a / 2) ** 2) +
          (Math.cos(radLat1) * Math.cos(radLat2) * (Math.sin(b / 2) ** 2))));
      s *= EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
    }
    static distanceBetween(a: GeoLocation, b: GeoLocation): number {
      return a.distance(b);
    }
}
