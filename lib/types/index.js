"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GeoResponseType = exports.Location = undefined;

var _GeoResponse = require("./GeoResponse");

var _GeoResponse2 = _interopRequireDefault(_GeoResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = function Location(lon, lat) {
    _classCallCheck(this, Location);

    this.lon = lon;
    this.lat = lat;
};

exports.Location = Location;
exports.GeoResponseType = _GeoResponse2.default;