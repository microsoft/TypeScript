//// [compareTypeSignaturesWithOptionalParameters.ts]
let x1: (a?: {b?:number, c?:number}) => void;
x1 = ({b = 1, c = 2} = {}) => {};
const x2 = ({b = 1, c = 2} = {}) => {};
x1 = x2;

let x3: (a?: {b?:number, c?:{d?:number, e?:number}}) => void;
x3 = ({b = 1, c:{d = 2, e = 3} = {}} = {}) => {};
const x4 = ({b = 1, c:{d = 2, e = 3} = {}} = {}) => {};
x3 = x4;

let x5: (a?: {b?:number, c?:{d?:{f?:number, g?:number}, e?:number}}) => void;
x5 = ({b = 1, c:{d:{f = 4, g = 5} = {}, e = 3} = {}} = {}) => {};
const x6 = ({b = 1, c:{d:{f = 4, g = 5} = {}, e = 3} = {}} = {}) => {};
x5 = x6;

let useImplementation1 = true;
let someOtherFunctionOfThisType = ({a = 3, b = 4} = {}) => a + b;
let adder: (nums?: {a?:number, b?:number}) => number;
if (useImplementation1) {
  adder = ({a = 1, b = 2} = {}) => a + b;
} else {
  adder = someOtherFunctionOfThisType;
}


//// [compareTypeSignaturesWithOptionalParameters.js]
"use strict";
var x1;
x1 = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.b, b = _c === void 0 ? 1 : _c, _d = _b.c, c = _d === void 0 ? 2 : _d;
};
var x2 = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.b, b = _c === void 0 ? 1 : _c, _d = _b.c, c = _d === void 0 ? 2 : _d;
};
x1 = x2;
var x3;
x3 = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.b, b = _c === void 0 ? 1 : _c, _d = _b.c, _e = _d === void 0 ? {} : _d, _f = _e.d, d = _f === void 0 ? 2 : _f, _g = _e.e, e = _g === void 0 ? 3 : _g;
};
var x4 = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.b, b = _c === void 0 ? 1 : _c, _d = _b.c, _e = _d === void 0 ? {} : _d, _f = _e.d, d = _f === void 0 ? 2 : _f, _g = _e.e, e = _g === void 0 ? 3 : _g;
};
x3 = x4;
var x5;
x5 = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.b, b = _c === void 0 ? 1 : _c, _d = _b.c, _e = _d === void 0 ? {} : _d, _f = _e.d, _g = _f === void 0 ? {} : _f, _h = _g.f, f = _h === void 0 ? 4 : _h, _j = _g.g, g = _j === void 0 ? 5 : _j, _k = _e.e, e = _k === void 0 ? 3 : _k;
};
var x6 = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.b, b = _c === void 0 ? 1 : _c, _d = _b.c, _e = _d === void 0 ? {} : _d, _f = _e.d, _g = _f === void 0 ? {} : _f, _h = _g.f, f = _h === void 0 ? 4 : _h, _j = _g.g, g = _j === void 0 ? 5 : _j, _k = _e.e, e = _k === void 0 ? 3 : _k;
};
x5 = x6;
var useImplementation1 = true;
var someOtherFunctionOfThisType = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? 3 : _c, _d = _b.b, b = _d === void 0 ? 4 : _d;
    return a + b;
};
var adder;
if (useImplementation1) {
    adder = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? 1 : _c, _d = _b.b, b = _d === void 0 ? 2 : _d;
        return a + b;
    };
}
else {
    adder = someOtherFunctionOfThisType;
}
