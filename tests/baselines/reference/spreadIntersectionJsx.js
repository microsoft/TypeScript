//// [tests/cases/compiler/spreadIntersectionJsx.tsx] ////

//// [spreadIntersectionJsx.tsx]
const React: any = null;
class A { a; }
class C { c; }
let intersected: A & C;
let element = <div { ...intersected } />;


//// [spreadIntersectionJsx.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var React = null;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var intersected;
var element = React.createElement("div", __assign({}, intersected));
