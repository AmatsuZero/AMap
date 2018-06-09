"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Location = require("./Location");

var _Location2 = _interopRequireDefault(_Location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class(resp) {
    _classCallCheck(this, _class);

    this.city = resp.city;
    this.adcode = resp.adcode;
    this.rectangle = resp.rectangle.split(";").map(function (location) {
        var loc = location.split(",");
        return new _Location2.default(loc[0], loc[1]);
    });
};

exports.default = _class;
module.exports = exports["default"];