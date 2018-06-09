import AMap from '../src';
import GetIP from '../src/location';

const api = new AMap('08e16d6e813d70419d0f59d1379ffbe7');

test('IP定位', async () => {
  const ret = await api.ip();
  expect(ret).not.toBeNull();
});

test('IP定位（自己传递IP）', async () => {
  const ip = await GetIP();
  const ret = await api.ip(ip);
  expect(ret).not.toBeNull();
});
