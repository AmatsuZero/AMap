// @flow
import Frisbee from 'frisbee';
import {
  GeoResponseType,
  RegeoResponseType,
  IPResponse,
  WeatherResponseType,
} from './Response';
import {
  GeoRequestConfig,
  RegeoRequestConfig,
  IPServiceRequestConfig,
  StaticMapRequestConfig,
  WeatherRequestConfig,
} from './Config';

export default class AMap {
    appKey: string;
    api: Frisbee;
    constructor(key: string) {
      this.appKey = key;
      this.api = new Frisbee({
        baseURI: 'http://restapi.amap.com/v3',
      });
    }

    async geo(config: GeoRequestConfig): Promise<GeoResponseType[]> {
      const res = await this.api.get('/geocode/geo', {
        body: {
          key: this.appKey,
          ...config,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body.geocodes.map(geocode => new GeoResponseType(geocode));
    }

    async regeo(config: RegeoRequestConfig): Promise<RegeoResponseType[]> {
      const res = await this.api.get('/geocode/regeo', {
        body: {
          key: this.appKey,
          ...config,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body.regeocodes.map(regeocode => new RegeoResponseType(regeocode));
    }

    async ip(config: IPServiceRequestConfig = new IPServiceRequestConfig()): Promise<IPResponse> {
      const res = await this.api.get('/ip', {
        body: {
          key: this.appKey,
          ...config,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return new IPResponse(res.body);
    }
    async weather(config: WeatherRequestConfig): Promise<WeatherResponseType> {
      const res = await this.api.get('/weather/weatherInfo', {
        body: {
          key: this.appKey,
          ...config,
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return new WeatherResponseType(res.body);
    }
    async staticMap(config: StaticMapRequestConfig): Promise<string> {
      const body: Object = {
        key: this.appKey,
        ...config,
      };
      const res = await this.api.get('/staticmap', {
        body,
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body;
    }
}
