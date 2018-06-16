// @flow
import Frisbee from 'frisbee';
import {
  GeoResponseType,
  RegeoResponseType,
  IPResponse,
  WeatherResponseType,
  DistrictResponseType,
  GeoLocation,
} from './Response';

import {
  GeoRequestConfig,
  RegeoRequestConfig,
  IPServiceRequestConfig,
  StaticMapRequestConfig,
  WeatherRequestConfig,
  DistrictRequestConfig,
  CoordinateConvertConfig,
} from './Config';

export default class AMap {
    appKey: string;
    api: Frisbee;
    privateKey: ?string;
    constructor(key: string, privateKey: ?string) {
      this.appKey = key;
      this.privateKey = privateKey;
      this.api = new Frisbee({
        baseURI: 'http://restapi.amap.com/v3',
      });
    }

    async geo(config: GeoRequestConfig): Promise<GeoResponseType[]> {
      if (this.privateKey) {
        config.sign(this.privateKey);
      }
      const res = await this.api.get('/geocode/geo', {
        body: {
          key: this.appKey,
          ...config.toParameter(),
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body.geocodes.map(geocode => new GeoResponseType(geocode));
    }

    async regeo(config: RegeoRequestConfig): Promise<RegeoResponseType[]> {
      if (this.privateKey) {
        config.sign(this.privateKey);
      }
      const res = await this.api.get('/geocode/regeo', {
        body: {
          key: this.appKey,
          ...config.toParameter(),
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body.regeocodes.map(regeocode => new RegeoResponseType(regeocode));
    }

    async ip(config: IPServiceRequestConfig = new IPServiceRequestConfig()): Promise<IPResponse> {
      if (this.privateKey) {
        config.sign(this.privateKey);
      }
      const res = await this.api.get('/ip', {
        body: {
          key: this.appKey,
          ...config.toParameter(),
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
          ...config.toParameter(),
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return new WeatherResponseType(res.body);
    }
    async staticMap(config: StaticMapRequestConfig): Promise<string> {
      if (this.privateKey) {
        config.sign(this.privateKey);
      }
      const res = await this.api.get('/staticmap', {
        body: {
          key: this.appKey,
          ...config.toParameter(),
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body;
    }
    async district(config: DistrictRequestConfig): Promise<DistrictResponseType> {
      const res = await this.api.get('/config/district', {
        body: {
          key: this.appKey,
          ...config.toParameter(),
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return new DistrictResponseType(res.body);
    }
    async coordinateConvert(config: CoordinateConvertConfig): Promise<GeoLocation[]> {
      const res = await this.api.get('/assistant/coordinate/convert', {
        body: {
          key: this.appKey,
          ...config.toParameter(),
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body.locations.split('|')
        .map(value => GeoLocation.fromString(value));
    }
}
