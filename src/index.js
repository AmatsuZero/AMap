// @flow
import Frisbee from 'frisbee';
import {
  GeoResponseType,
  RegeoResponseType,
  IPResponse,
  WeatherResponseType,
  DistrictResponseType,
  GeoLocation,
  WalkingResponseType,
  TransitResponseType,
} from './Response';

import {
  GeoRequestConfig,
  RegeoRequestConfig,
  IPServiceRequestConfig,
  StaticMapRequestConfig,
  WeatherRequestConfig,
  DistrictRequestConfig,
  CoordinateConvertConfig,
  WalkingRequestConfig,
  TransitRequestConfig,
} from './Config';
import BaseRequestConfig from './Config/BaseRequestConfig';

export default class AMap {
    appKey: string;
    api: Frisbee;
    privateKey: ?string;
    constructor(key: string, privateKey: ?string) {
      this.appKey = key;
      this.privateKey = privateKey;
      this.api = new Frisbee({
        baseURI: 'http://restapi.amap.com/',
      });
    }
    async baseRequest(
      config: BaseRequestConfig,
      fragment: string,
      withSig: boolean = true,
      apiVersion: string = 'v3',
    ): Promise<Object> {
      if (this.privateKey && withSig) {
        config.sign(this.privateKey);
      }
      const res = await this.api.get(`/${apiVersion}/${fragment}`, {
        body: {
          key: this.appKey,
          ...config.toParameter(),
        },
      });
      if (res.err) throw res.err;
      if (res.body.status === '0') throw new Error(res.body.info);
      return res.body;
    }

    async geo(config: GeoRequestConfig): Promise<GeoResponseType[]> {
      const body = await this.baseRequest(config, 'geocode/geo');
      return body.geocodes.map(geocode => new GeoResponseType(geocode));
    }

    async regeo(config: RegeoRequestConfig): Promise<RegeoResponseType[]> {
      const body = await this.baseRequest(config, 'geocode/regeo');
      return body.regeocodes.map(regeocode => new RegeoResponseType(regeocode));
    }

    async ip(config: IPServiceRequestConfig = new IPServiceRequestConfig()): Promise<IPResponse> {
      const body = await this.baseRequest(config, 'ip');
      return new IPResponse(body);
    }

    async weather(config: WeatherRequestConfig): Promise<WeatherResponseType> {
      const body = await this.baseRequest(config, 'weather/weatherInfo', false);
      return new WeatherResponseType(body);
    }

    async staticMap(config: StaticMapRequestConfig): Promise<string> {
      const ret = await this.baseRequest(config, 'staticmap');
      return ret.toString();
    }
    async district(config: DistrictRequestConfig): Promise<DistrictResponseType> {
      const body = await this.baseRequest(config, 'config/district', false);
      return new DistrictResponseType(body);
    }

    async coordinateConvert(config: CoordinateConvertConfig): Promise<GeoLocation[]> {
      const body = await this.baseRequest(config, 'assistant/coordinate/convert');
      return body.locations.split('|')
        .map(value => GeoLocation.fromString(value));
    }

    async walkingDirection(config: WalkingRequestConfig): Promise<WalkingResponseType> {
      const body = await this.baseRequest(config, 'direction/walking');
      return new WalkingResponseType(body);
    }

    async transitDirection(config: TransitRequestConfig): Promise<TransitResponseType> {
      const body = await this.baseRequest(config, 'direction/transit/integrated');
      return new TransitResponseType(body);
    }
}
