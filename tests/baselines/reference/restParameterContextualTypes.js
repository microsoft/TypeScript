//// [restParameterContextualTypes.ts]
type ComplexCalls = {
    (): string;
    (a: number): string;
    (a: {x: number}, b: string): string;
    (a: symbol, ...rest: {y: string}[]): string;
    (...rest: {z: string}[]): string;
};

const x: ComplexCalls = (...rest) => rest.toString();

const y: ComplexCalls = (_a = 1, ...rest) => rest.toString();

const z: ComplexCalls = (_a = 1, _b = "", ...rest) => rest.toString();

const more: ComplexCalls = (_a = 1, _b = "", _c = { z: "" }, ...rest) => rest.toString();


//// [restParameterContextualTypes.js]
var x = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest.toString();
};
var y = function (_a) {
    if (_a === void 0) { _a = 1; }
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return rest.toString();
};
var z = function (_a, _b) {
    if (_a === void 0) { _a = 1; }
    if (_b === void 0) { _b = ""; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return rest.toString();
};
var more = function (_a, _b, _c) {
    if (_a === void 0) { _a = 1; }
    if (_b === void 0) { _b = ""; }
    if (_c === void 0) { _c = { z: "" }; }
    var rest = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        rest[_i - 3] = arguments[_i];
    }
    return rest.toString();
};
