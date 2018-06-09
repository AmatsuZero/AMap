"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = function () {
    function Location(lon, lat) {
        _classCallCheck(this, Location);

        this.lon = Number.parseFloat(lon);
        this.lat = Number.parseFloat(lat);
    }

    _createClass(Location, null, [{
        key: "fromString",
        value: function fromString(str) {
            var loc = str.split(",");
            return new Location(loc[0], loc[1]);
        }
    }]);

    return Location;
}();

exports.default = Location;
module.exports = exports["default"];