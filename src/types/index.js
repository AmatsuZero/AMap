// @flow
import GeoResponseType from "./Geo/GeoResponse"
import RegeoResponseType from "./Geo/RegeoResponse"

class Location  {
    lon: number
    lat: number
    constructor(lon: number, lat: number) {
        this.lon = lon
        this.lat = lat
    }
}

export {
    Location,
    GeoResponseType,
    RegeoResponseType
}
