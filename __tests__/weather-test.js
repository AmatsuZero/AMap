import AMap from '../src';

const api = new AMap('08e16d6e813d70419d0f59d1379ffbe7');

describe('天气', () => {
  test('实况天气', async () => {
    const ret = await api.weather();
    expect(ret).not.toBeNull();
  });

  test('预报天气', async () => {
    const ret = await api.weather('110101', 'all');
    expect(ret).not.toBeNull();
  });
});

