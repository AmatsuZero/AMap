import AMap from "../src"
const api = new AMap("08e16d6e813d70419d0f59d1379ffbe7");
import { getIP } from "../src/location"

test("IP定位", async () => {
    const ret = await api.ip();
    expect(ret).not.toBeNull();
});

test("IP定位", async () => {
    const ip = await getIP();
    const ret = await api.ip(ip);
    expect(ret).not.toBeNull();
});