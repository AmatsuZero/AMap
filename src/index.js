// @flow
import Frisbee from 'frisbee';
import {
  GeoResponseType,
  Location,
  RegeoResponseType,
  IPResponse,
  WeatherResponseType,
} from './types';
import GeoResponse from './types/Geo/GeoResponse';

type OutputType = "JSON" | "XML";
type RoadLevel = 0 | 1;

export default class AMap {
    appKey: string;
    api: Frisbee;
    constructor(key: string) {
      this.appKey = key;
      this.api = new Frisbee({
        baseURI: 'http://restapi.amap.com/v3',
      });
    }

    async geo(
      addresses: Array<string>,
      batch: boolean = false,
      city: ?string,
      sig: ?string,
      callback: ?string,
      output: OutputType = 'JSON',
    ): Promise<?GeoResponseType[]> {
      const res = await this.api.get('/geocode/geo', {
        body: {
          key: this.appKey,
          output,
          address: addresses.reduce((accumulator, currentValue, index) => accumulator + (index === 0 ? '' : '|') + currentValue, ''),
          city,
          callback,
          sig,
          batch,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body.geocodes.map(geocode => new GeoResponse(geocode));
    }

    async regeo(
      locations: Array<Location>,
      batch: boolean = false,
      poitype: ?string = null,
      sig: ?string,
      callback ?: string,
      radius: number = 1000,
      extensions: "base" | "all" = 'base',
      roadlevel: ?RoadLevel,
      homeorcorp: 0 | 1 | 2 = 0,
      output: OutputType = 'JSON',
    ): Promise<?RegeoResponseType[]> {
      const res = await this.api.get('/geocode/regeo', {
        body: {
          key: this.appKey,
          location: locations
            .map(val => `${val.lon},${val.lat}`)
            .reduce((accumulator, currentValue, index) => accumulator + (index === 0 ? '' : '|') + currentValue, ''),
          poitype,
          radius,
          sig,
          callback,
          extensions,
          roadlevel,
          homeorcorp,
          batch,
          output,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body.regeocodes.map(regeocode => new RegeoResponseType(regeocode));
    }

    async ip(
      ip: ?string,
      sig: ?string,
      output: OutputType = 'JSON',
    ): Promise<?IPResponse> {
      const res = await this.api.get('/ip', {
        body: {
          key: this.appKey,
          sig,
          output,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return new IPResponse(res.body);
    }
    async weather(
      city: ?string,
      extensions: 'base' | 'all' = 'base',
      output: "JSON" | "XML" = 'JSON',
    ): Promise<?WeatherResponseType> {
      let parameter = city;
      if (!parameter) {
        const ret = await this.ip();
        parameter = ret.adcode;
      }
      const res = await this.api.get('/weather/weatherInfo', {
        body: {
          key: this.appKey,
          city: parameter,
          output,
          extensions,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return new WeatherResponseType(res.body);
    }
}
