"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Location = require("../Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeoResponse = function GeoResponse(resp) {
    _classCallCheck(this, GeoResponse);

    this.formattedAddress = resp.formattedAddress;
    this.province = resp.province;
    this.citycode = resp.citycode;
    this.district = resp.district;
    this.street = resp.street;
    this.number = resp.number;
    this.location = _Location2.default.fromString(resp.location);
    this.level = resp.level;
};

exports.default = GeoResponse;
module.exports = exports["default"];