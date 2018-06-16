import AMap from '../src';
import { Label, Marker, Path, Size } from '../src/StaticMap';
import { StaticMapRequestConfig } from '../src/Config';
import GeoLocation from '../src/Response/GeoLocation';

const api = new AMap(process.env.APPKEY);

describe('静态地图图片', () => {
  test('标注', async () => {
    const location = new GeoLocation(116.481485, 39.990464);
    const marker = new Marker([location], 'mid', '0x4286f4', 'A');
    const config = new StaticMapRequestConfig();
    config.location = location;
    config.size = new Size(750, 300);
    config.markers = [marker];
    config.zoom = 10;
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  }, 30000);
  test('标注（自定义Marker）', async () => {
    const location = new GeoLocation(116.481485, 39.990464);
    const size = new Size(400, 400);
    const marker = new Marker(
      [location], '-1', '', '0',
      'http://ico.ooopic.com/ajax/iconpng/?id=158688.png',
    );
    const config = new StaticMapRequestConfig();
    config.location = location;
    config.size = size;
    config.markers = [marker];
    config.zoom = 10;
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  }, 30000);
  test('标签', async () => {
    const location = new GeoLocation(116.481485, 39.990464);
    const size = new Size(400, 400);
    const label = new Label([location], '朝阳公园', 2, 0, 16, '0xFFFFFF', '0x008000');
    const config = new StaticMapRequestConfig();
    config.location = location;
    config.size = size;
    config.labels = [label];
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  }, 30000);
  test('折线', async () => {
    const location = new GeoLocation(116.481485, 39.990464);
    const start = new GeoLocation(116.31604, 39.96491);
    const end = new GeoLocation(116.321785, 39.966827);
    const size = new Size(500, 500);
    const path = new Path([start, end]);
    const config = new StaticMapRequestConfig();
    config.location = location;
    config.size = size;
    config.paths = [path];
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  }, 30000);
  test('混合', async () => {
    const location = new GeoLocation(116.481485, 39.990464);
    const size = new Size(750, 300);
    const marker = new Marker([location], 'mid', '0x4286f4', 'A');
    const label = new Label([location], '朝阳公园', 2, 0, 16, '0xFFFFFF', '0x008000');
    const start = new GeoLocation(116.31604, 39.96491);
    const end = new GeoLocation(116.321785, 39.966827);
    const path = new Path([start, end]);
    const config = new StaticMapRequestConfig();
    config.location = location;
    config.size = size;
    config.markers = [marker];
    config.labels = [label];
    config.paths = [path];
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  }, 30000);
});
