"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _frisbee = require("frisbee");

var _frisbee2 = _interopRequireDefault(_frisbee);

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AMap = function () {
    function AMap(key) {
        _classCallCheck(this, AMap);

        this.appKey = key;
        this.api = new _frisbee2.default({
            baseURI: "http://restapi.amap.com/v3"
        });
    }

    _createClass(AMap, [{
        key: "geo",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(addresses) {
                var batch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var city = arguments[2];
                var sig = arguments[3];
                var callback = arguments[4];
                var output = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "JSON";
                var res;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.api.get("/geocode/geo", {
                                    body: {
                                        key: this.appKey,
                                        output: output,
                                        address: addresses.reduce(function (accumulator, currentValue, index) {
                                            return accumulator + (index === 0 ? "" : "|") + currentValue;
                                        }, ""),
                                        city: city,
                                        callback: callback,
                                        sig: sig,
                                        batch: batch
                                    }
                                });

                            case 2:
                                res = _context.sent;

                                if (!res.err) {
                                    _context.next = 5;
                                    break;
                                }

                                throw res.err;

                            case 5:
                                if (!(res.body.status === "0")) {
                                    _context.next = 7;
                                    break;
                                }

                                throw new Error(res.body["info"]);

                            case 7:
                                return _context.abrupt("return", res.body["geocodes"]);

                            case 8:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function geo(_x) {
                return _ref.apply(this, arguments);
            }

            return geo;
        }()
    }, {
        key: "regeo",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(locations) {
                var batch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var poitype = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var sig = arguments[3];
                var callback = arguments[4];
                var radius = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;
                var extensions = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "base";
                var roadlevel = arguments[7];
                var homeorcorp = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
                var output = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : "JSON";
                var res;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.api.get("/geocode/regeo", {
                                    body: {
                                        key: this.appKey,
                                        location: locations.map(function (val) {
                                            return val.lon + "," + val.lat;
                                        }).reduce(function (accumulator, currentValue, index) {
                                            return accumulator + (index === 0 ? "" : "|") + currentValue;
                                        }, ""),
                                        poitype: poitype,
                                        radius: radius,
                                        sig: sig,
                                        callback: callback,
                                        extensions: extensions,
                                        roadlevel: roadlevel,
                                        homeorcorp: homeorcorp,
                                        batch: batch,
                                        output: output
                                    }
                                });

                            case 2:
                                res = _context2.sent;

                                if (!res.err) {
                                    _context2.next = 5;
                                    break;
                                }

                                throw res.err;

                            case 5:
                                if (!(res.body.status === "0")) {
                                    _context2.next = 7;
                                    break;
                                }

                                throw new Error(res.body["info"]);

                            case 7:
                                return _context2.abrupt("return", res.body["regeocodes"]);

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function regeo(_x4) {
                return _ref2.apply(this, arguments);
            }

            return regeo;
        }()
    }]);

    return AMap;
}();

exports.default = AMap;
module.exports = exports["default"];