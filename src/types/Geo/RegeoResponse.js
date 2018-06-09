// @flow
import Location from "../Location";

class Neighborhood {
    name: string;
    type: string;
    constructor(prop) {
        this.name = prop.name;
        this.type = prop.type;
    }
}

class StreetNumber {
    street: string;
    number: string;
    location: Location;
    direction: string;
    distance: number;
    constructor(prop) {
        this.street = prop.street;
        this.number = prop.number;
        this.location = Location.fromString(prop.location);
        this.direction = prop.direction;
        this.distance = Number.parseFloat(prop.distance);
    }
}

class Building {
    name: string;
    type: string;
    constructor(props) {
        this.name = props.name;
        this.type = props.type;
    }
}

class BusinessArea {
    businessArea: string;
    location: Location;
    name: string;
    id: string;
    constructor(prop) {
        this.businessArea = prop.businessArea;
        this.location = Location.fromString(prop.location);
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

    constructor(props) {
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
    location: Location;

    constructor(prop) {
        this.id = prop.id;
        this.name = prop.name;
        this.distance = Number.parseFloat(prop.distance);
        this.direction = prop.direction;
        this.location = Location.fromString(prop.location)
    }
}

class RoadInter {
    distance: number;
    direction: string;
    location: Location;
    first_id: string;
    first_name: string;
    second_id: string;
    second_name: string;

    constructor(prop) {
        this.distance = Number.parseFloat(prop.distance);
        this.direction = prop.direction;
        this.location = Location.fromString(prop.location);
        this.first_id = prop.first_id;
        this.first_name = prop.first_name;
        this.second_id = prop.second_id;
        this.second_name = prop.second_name;
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
    location: Location;
    businessarea: string;

    constructor(prop) {
        this.id = prop.id;
        this.name = prop.name;
        this.type = prop.type;
        this.tel = prop.tel;
        this.direction = Number.parseFloat(prop.distance);
        this.direction = prop.direction;
        this.address = prop.address;
        this.location = Location.fromString(prop.location);
        this.businessarea = prop.businessarea;
    }
}

class AOI {
    id: string;
    name: string;
    adcode: string;
    location: Location;
    area: number;
    distance: number;

    constructor(prop) {
        this.id = prop.id;
        this.name = prop.name;
        this.adcode = prop.adcode;
        this.location = Location.fromString(prop.location);
        this.area = Number.parseFloat(prop.area);
        this.distance = Number.parseFloat(prop.distance);
    }
}

export default class RegeoResponse {
    formatted_address: string;
    addressComponent: AddressComponent[] | AddressComponent;
    roads: ?Road[];
    roadinters: ?RoadInter[];
    pois: ?POI[];
    aois: ?AOI[];

    constructor(resp) {
        this.formatted_address = resp.formatted_address;
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
