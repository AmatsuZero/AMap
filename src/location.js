// @flow
import Frisbee from 'frisbee';

const api = new Frisbee({
  baseURI: 'http://pv.sohu.com',
});

const getIP = async () => {
  const result = await api.get('/cityjson');
  if (result.err) throw result.err;
  const jsonStr = result.body.split('=')[1].trim();
  return JSON.parse(jsonStr.replace(/;/gi, '')).cip;
};

export { getIP as default };
