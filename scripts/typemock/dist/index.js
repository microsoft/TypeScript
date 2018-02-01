"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arg_1 = require("./arg");
exports.Arg = arg_1.Arg;
var times_1 = require("./times");
exports.Times = times_1.Times;
var mock_1 = require("./mock");
exports.Mock = mock_1.Mock;
exports.Spy = mock_1.Spy;
var inject_1 = require("./inject");
exports.Inject = inject_1.Inject;
var timers_1 = require("./timers");
exports.Timers = timers_1.Timers;
const mock_2 = require("./mock");
function spy(object, propertyKey) {
    return object === undefined ? mock_2.Mock.spy() : propertyKey === undefined ? mock_2.Mock.spy(object) : mock_2.Mock.spy(object, propertyKey);
}
exports.spy = spy;

//# sourceMappingURL=index.js.map
