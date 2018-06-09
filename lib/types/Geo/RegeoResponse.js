"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Neighborhood = function Neighborhood(prop) {
    _classCallCheck(this, Neighborhood);

    this.name = prop.name;
    this.type = prop.type;
};

var StreetNumber = function StreetNumber(prop) {
    _classCallCheck(this, StreetNumber);

    this.street = prop.street;
    this.number = prop.number;
    this.location = _Location2.default.fromString(prop.location);
    this.direction = prop.direction;
    this.distance = Number.parseFloat(prop.distance);
};

var Building = function Building(props) {
    _classCallCheck(this, Building);

    this.name = props.name;
    this.type = props.type;
};

var BusinessArea = function BusinessArea(prop) {
    _classCallCheck(this, BusinessArea);

    this.businessArea = prop.businessArea;
    this.location = _Location2.default.fromString(prop.location);
    this.name = prop.name;
    this.id = prop.id;
};

var AddressComponent = function AddressComponent(props) {
    _classCallCheck(this, AddressComponent);

    this.province = props.province;
    this.city = Array.isArray(props.city) ? null : props.city;
    this.citycode = props.citycode;
    this.district = props.district;
    this.adcode = props.adcode;
    this.neighborhood = Array.isArray(props.neighborhood) ? props.neighborhood.map(function (val) {
        return new Neighborhood(val);
    }) : new Neighborhood(props.neighborhood);
    this.township = props.township;
    this.towncode = props.towncode;
    this.building = Array.isArray(props.building) ? props.building.map(function (val) {
        return new Building(val);
    }) : new Building(props.building);
    this.streetNumber = Array.isArray(props.streetNumber) ? props.streetNumber.map(function (val) {
        return new StreetNumber(val);
    }) : new StreetNumber(props.streetNumber);
    this.safeArea = props.safeArea;
    this.businessAreas = Array.isArray(props.businessAreas) ? props.businessAreas.map(function (val) {
        return new BusinessArea(val);
    }) : new BusinessArea(props.businessAreas);
};

var Road = function Road(prop) {
    _classCallCheck(this, Road);

    this.id = prop.id;
    this.name = prop.name;
    this.distance = Number.parseFloat(prop.distance);
    this.direction = prop.direction;
    this.location = _Location2.default.fromString(prop.location);
};

var RoadInter = function RoadInter(prop) {
    _classCallCheck(this, RoadInter);

    this.distance = Number.parseFloat(prop.distance);
    this.direction = prop.direction;
    this.location = _Location2.default.fromString(prop.location);
    this.firstId = prop.firstId;
    this.firstName = prop.firstName;
    this.secondId = prop.secondId;
    this.secondName = prop.secondName;
};

var POI = function POI(prop) {
    _classCallCheck(this, POI);

    this.id = prop.id;
    this.name = prop.name;
    this.type = prop.type;
    this.tel = prop.tel;
    this.direction = Number.parseFloat(prop.distance);
    this.direction = prop.direction;
    this.address = prop.address;
    this.location = _Location2.default.fromString(prop.location);
    this.businessarea = prop.businessarea;
};

var AOI = function AOI(prop) {
    _classCallCheck(this, AOI);

    this.id = prop.id;
    this.name = prop.name;
    this.adcode = prop.adcode;
    this.location = _Location2.default.fromString(prop.location);
    this.area = Number.parseFloat(prop.area);
    this.distance = Number.parseFloat(prop.distance);
};

var RegeoResponse = function RegeoResponse(resp) {
    _classCallCheck(this, RegeoResponse);

    this.formatted_address = resp.formattedAddress;
    this.addressComponent = Array.isArray(resp.addressComponent) ? resp.addressComponent.map(function (val) {
        return new AddressComponent(val);
    }) : new AddressComponent(resp.addressComponent);
    this.roads = resp.roads !== undefined && Array.isArray(resp.roads) ? resp.roads.map(function (val) {
        return new Road(val);
    }) : null;
    this.roadinters = resp.roadinters !== undefined && Array.isArray(resp.roadinters) ? resp.roadinters.map(function (value) {
        return new RoadInter(value);
    }) : null;
    this.pois = resp.pois !== undefined && Array.isArray(resp.pois) ? resp.pois.map(function (value) {
        return new POI(value);
    }) : null;
    this.aois = resp.aois !== undefined && Array.isArray(resp.aois) ? resp.aois.map(function (value) {
        return new AOI(value);
    }) : null;
};

exports.default = RegeoResponse;
module.exports = exports["default"];