// @flow
import GeoLocation from '../GeoLocation';

class Neighborhood {
    name: string;
    type: string;

    constructor(prop: Object) {
      this.name = prop.name;
      this.type = prop.type;
    }
}

class StreetNumber {
    street: string;
    number: string;
    location: GeoLocation;
    direction: string;
    distance: number;

    constructor(prop: Object) {
      this.street = prop.street;
      this.number = prop.number;
      this.location = GeoLocation.fromString(prop.location);
      this.direction = prop.direction;
      this.distance = Number.parseFloat(prop.distance);
    }
}

class Building {
    name: string;
    type: string;

    constructor(props: Object) {
      this.name = props.name;
      this.type = props.type;
    }
}

class BusinessArea {
    businessArea: string;
    location: GeoLocation;
    name: string;
    id: string;

    constructor(prop: Object) {
      this.businessArea = prop.businessArea;
      this.location = GeoLocation.fromString(prop.location);
      this.name = prop.name;
      this.id = prop.id;
    }
}

class AddressComponent {
    province: string;
    city: ?string;
    citycode: string;
    district: string;
    adcode: string;
    township: string;
    towncode: string;
    neighborhood: Neighborhood[] | Neighborhood;
    building: Building[] | Building;
    streetNumber: StreetNumber[] | StreetNumber;
    safeArea: string;
    businessAreas: ?BusinessArea[] | ?BusinessArea;

    constructor(props: Object) {
      this.province = props.province;
      this.city = Array.isArray(props.city) ? null : props.city;
      this.citycode = props.citycode;
      this.district = props.district;
      this.adcode = props.adcode;
      this.neighborhood = Array.isArray(props.neighborhood)
        ? props.neighborhood.map(val => new Neighborhood(val))
        : new Neighborhood(props.neighborhood);
      this.township = props.township;
      this.towncode = props.towncode;
      this.building = Array.isArray(props.building)
        ? props.building.map(val => new Building(val))
        : new Building(props.building);
      this.streetNumber = Array.isArray(props.streetNumber)
        ? props.streetNumber.map(val => new StreetNumber(val))
        : new StreetNumber(props.streetNumber);
      this.safeArea = props.safeArea;
      this.businessAreas = Array.isArray(props.businessAreas)
        ? props.businessAreas.map(val => new BusinessArea(val))
        : new BusinessArea(props.businessAreas);
    }
}

class Road {
    id: string;
    name: string;
    distance: number;
    direction: string;
    location: GeoLocation;

    constructor(prop: Object) {
      this.id = prop.id;
      this.name = prop.name;
      this.distance = Number.parseFloat(prop.distance);
      this.direction = prop.direction;
      this.location = GeoLocation.fromString(prop.location);
    }
}

class RoadInter {
    distance: number;
    direction: string;
    location: GeoLocation;
    firstId: string;
    firstName: string;
    secondId: string;
    secondName: string;

    constructor(prop: Object) {
      this.distance = Number.parseFloat(prop.distance);
      this.direction = prop.direction;
      this.location = GeoLocation.fromString(prop.location);
      this.firstId = prop.first_id;
      this.firstName = prop.first_name;
      this.secondId = prop.second_id;
      this.secondName = prop.second_name;
    }
}

class POI {
    id: string;
    name: string;
    type: string;
    tel: string;
    distance: number;
    direction: string;
    address: string;
    location: GeoLocation;
    businessarea: string;

    constructor(prop: Object) {
      this.id = prop.id;
      this.name = prop.name;
      this.type = prop.type;
      this.tel = prop.tel;
      this.distance = Number.parseFloat(prop.distance);
      this.direction = prop.direction;
      this.address = prop.address;
      this.location = GeoLocation.fromString(prop.location);
      this.businessarea = prop.businessarea;
    }
}

class AOI {
    id: string;
    name: string;
    adcode: string;
    location: GeoLocation;
    area: number;
    distance: number;

    constructor(prop: Object) {
      this.id = prop.id;
      this.name = prop.name;
      this.adcode = prop.adcode;
      this.location = GeoLocation.fromString(prop.location);
      this.area = Number.parseFloat(prop.area);
      this.distance = Number.parseFloat(prop.distance);
    }
}

export default class RegeoResponse {
    formattedAddress: string;
    addressComponent: AddressComponent[] | AddressComponent;
    roads: ?Road[];
    roadinters: ?RoadInter[];
    pois: ?POI[];
    aois: ?AOI[];

    constructor(resp: Object) {
      this.formattedAddress = resp.formatted_address;
      this.addressComponent = Array.isArray(resp.addressComponent)
        ? resp.addressComponent.map(val => new AddressComponent(val))
        : new AddressComponent(resp.addressComponent);
      this.roads = resp.roads !== undefined && Array.isArray(resp.roads)
        ? resp.roads.map(val => new Road(val))
        : null;
      this.roadinters = resp.roadinters !== undefined && Array.isArray(resp.roadinters) ?
        resp.roadinters.map(value => new RoadInter(value))
        : null;
      this.pois = resp.pois !== undefined && Array.isArray(resp.pois)
        ? resp.pois.map(value => new POI(value))
        : null;
      this.aois = resp.aois !== undefined && Array.isArray(resp.aois)
        ? resp.aois.map(value => new AOI(value))
        : null;
    }
}
