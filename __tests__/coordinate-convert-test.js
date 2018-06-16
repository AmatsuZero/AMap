import AMap from '../src';
import { CoordinateConvertConfig } from '../src/Config';
import GeoLocation from '../src/Response/GeoLocation';

const api = new AMap(process.env.APPKEY);

test('地理坐标转换', async () => {
  const config = new CoordinateConvertConfig();
  const locationA = new GeoLocation(116.481499, 39.990475);
  const locationB = new GeoLocation(116.481499, 39.990375);
  config.locations = [locationA, locationB];
  config.coordsys = 'autonavi';
  const ret = await api.coordinateConvert(config);
  expect(ret).not.toBeNull();
});
