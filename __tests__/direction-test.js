import AMap from '../src';
import { GeoLocation } from '../src/Response';
import {
  WalkingRequestConfig,
  TransitRequestConfig,
} from '../src/Config';

const api = new AMap(process.env.APPKEY);

describe('导航', () => {
  test('步行规划', async () => {
    const config = new WalkingRequestConfig();
    config.origin = GeoLocation.fromString('116.481028,39.989643');
    config.destination = GeoLocation.fromString('116.434446,39.90816');
    const ret = await api.walkingDirection(config);
    expect(ret).not.toBeNull();
  });
  test('公共路径规划', async () => {
    const config = new TransitRequestConfig();
    config.origin = GeoLocation.fromString('116.481028,39.989643');
    config.destination = GeoLocation.fromString('116.434446,39.90816');
    config.city = '北京';
    config.cityd = '北京';
    const ret = await api.transitDirection(config);
    expect(ret).not.toBeNull();
  });
});
