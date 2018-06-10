import AMap from '../src';
import { WeatherRequestConfig } from '../src/Config';

const api = new AMap('08e16d6e813d70419d0f59d1379ffbe7');

describe('天气', () => {
  test('实况天气', async () => {
    const { adcode } = await api.ip();
    const config = new WeatherRequestConfig();
    config.city = adcode;
    const ret = await api.weather(config);
    expect(ret).not.toBeNull();
  });

  test('预报天气', async () => {
    const config = new WeatherRequestConfig();
    config.city = '110101';
    config.extensions = 'all';
    const ret = await api.weather(config);
    expect(ret).not.toBeNull();
  });
});

