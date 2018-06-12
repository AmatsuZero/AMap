import AMap from '../src';
import { Label, Marker, Path, Size } from '../src/StaticMap';
import { StaticMapRequestConfig } from '../src/Config';
import Location from '../src/Response/Location';

const api = new AMap('08e16d6e813d70419d0f59d1379ffbe7');

describe('静态地图图片', () => {
  test('标注', async () => {
    const location = new Location(116.481485, 39.990464);
    const marker = new Marker([location], 'mid', '0x4286f4', 'A');
    const config = new StaticMapRequestConfig();
    config.setLocation(location);
    config.setSize(new Size(750, 300));
    config.setMarkers([marker]);
    config.zoom = 10;
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  });
  test('标注（自定义Marker）', async () => {
    const location = new Location(116.481485, 39.990464);
    const size = new Size(400, 400);
    const marker = new Marker(
      [location], '-1', '', '0',
      'http://ico.ooopic.com/ajax/iconpng/?id=158688.png',
    );
    const config = new StaticMapRequestConfig();
    config.setLocation(location);
    config.setSize(size);
    config.setMarkers([marker]);
    config.zoom = 10;
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  });
  test('标签', async () => {
    const location = new Location(116.481485, 39.990464);
    const size = new Size(400, 400);
    const label = new Label([location], '朝阳公园', 2, 0, 16, '0xFFFFFF', '0x008000');
    const config = new StaticMapRequestConfig();
    config.setLocation(location);
    config.setSize(size);
    config.setLabels([label]);
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  });
  test('折线', async () => {
    const location = new Location(116.481485, 39.990464);
    const start = new Location(116.31604, 39.96491);
    const end = new Location(116.321785, 39.966827);
    const size = new Size(500, 500);
    const path = new Path([start, end]);
    const config = new StaticMapRequestConfig();
    config.setLocation(location);
    config.setSize(size);
    config.setPaths([path]);
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  });
  test('混合', async () => {
    const location = new Location(116.481485, 39.990464);
    const size = new Size(750, 300);
    const marker = new Marker([location], 'mid', '0x4286f4', 'A');
    const label = new Label([location], '朝阳公园', 2, 0, 16, '0xFFFFFF', '0x008000');
    const start = new Location(116.31604, 39.96491);
    const end = new Location(116.321785, 39.966827);
    const path = new Path([start, end]);
    const config = new StaticMapRequestConfig();
    config.setLocation(location);
    config.setSize(size);
    config.setMarkers([marker]);
    config.setLabels([label]);
    config.setPaths([path]);
    const ret = await api.staticMap(config);
    expect(ret).not.toBeNull();
  });
});
