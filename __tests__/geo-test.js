import AMap from '../src';

const api = new AMap('08e16d6e813d70419d0f59d1379ffbe7');

describe('编码', () => {
  test('地理编码', async () => {
    const ret = await api.geo(['方恒国际中心A座']);
    expect(ret).not.toBeUndefined();
  });

  test('逆地理编码', async () => {
    try {
      const ret = await api.regeo([{ lon: 116.481488, lat: 39.990464 }], true, '商务写字楼');
      expect(ret).not.toBeUndefined();
    } catch (e) {
      fail(e.message);
    }
  });
});

