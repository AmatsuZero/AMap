import AMap from '../src';
import { DistrictRequestConfig } from '../src/Config';

const api = new AMap('08e16d6e813d70419d0f59d1379ffbe7');

describe('行政区域查询', () => {
  test('基础查询', async () => {
    const config = new DistrictRequestConfig();
    config.keywords = '山东';
    config.subdistrict = 2;
    const ret = await api.district(config);
    expect(ret).not.toBeNull();
  });
  test('行政边界', async () => {
    const config = new DistrictRequestConfig();
    config.keywords = '山东';
    config.extensions = 'all';
    const ret = await api.district(config);
    expect(ret).not.toBeNull();
  });
});
