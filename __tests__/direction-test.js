import AMap from '../src';
import { GeoLocation } from '../src/Response';
import { WalkingRequestConfig } from '../src/Config';

const api = new AMap(process.env.APPKEY);

describe('导航', () => {
  test('步行导航', async () => {
    const config = new WalkingRequestConfig();
    config.origin = GeoLocation.fromString('116.481028,39.989643');
    config.destination = GeoLocation.fromString('116.434446,39.90816');
    const ret = await api.walkingDirection(config);
    expect(ret).not.toBeNull();
  });
});
