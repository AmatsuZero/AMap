"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIP = undefined;

var getIP = exports.getIP = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result, jsonStr;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return api.get("/cityjson");

                    case 2:
                        result = _context.sent;

                        if (!result.err) {
                            _context.next = 5;
                            break;
                        }

                        throw result.err;

                    case 5:
                        jsonStr = result.body.split("=")[1].trim();
                        return _context.abrupt("return", JSON.parse(jsonStr.replace(/;/gi, ""))["cip"]);

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getIP() {
        return _ref.apply(this, arguments);
    };
}();

var _frisbee = require("frisbee");

var _frisbee2 = _interopRequireDefault(_frisbee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var api = new _frisbee2.default({
    baseURI: "http://pv.sohu.com"
});