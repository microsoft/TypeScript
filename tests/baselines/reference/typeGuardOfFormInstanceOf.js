//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormInstanceOf.ts] ////

//// [typeGuardOfFormInstanceOf.ts]
// A type guard of the form x instanceof C, where C is of a subtype of the global type 'Function' 
// and C has a property named 'prototype'
//  - when true, narrows the type of x to the type of the 'prototype' property in C provided 
//    it is a subtype of the type of x, or
//  - when false, has no effect on the type of x.

class C1 {
    p1: string;
}
class C2 {
    p2: number;
}
class D1 extends C1 {
    p3: number;
}
class C3 {
    p4: number;
}
var str: string;
var num: number;
var strOrNum: string | number;

var ctor1: C1 | C2;
str = ctor1 instanceof C1 && ctor1.p1; // C1
num = ctor1 instanceof C2 && ctor1.p2; // C2
str = ctor1 instanceof D1 && ctor1.p1; // D1
num = ctor1 instanceof D1 && ctor1.p3; // D1

var ctor2: C2 | D1;
num = ctor2 instanceof C2 && ctor2.p2; // C2
num = ctor2 instanceof D1 && ctor2.p3; // D1
str = ctor2 instanceof D1 && ctor2.p1; // D1
var r2: D1 | C2 = ctor2 instanceof C1 && ctor2; // C2 | D1

var ctor3: C1 | C2;
if (ctor3 instanceof C1) {
    ctor3.p1; // C1
}
else {
    ctor3.p2; // C2
}

var ctor4: C1 | C2 | C3;
if (ctor4 instanceof C1) {
    ctor4.p1; // C1
}
else if (ctor4 instanceof C2) {
    ctor4.p2; // C2
}
else {
    ctor4.p4; // C3
}

var ctor5: C1 | D1 | C2;
if (ctor5 instanceof C1) {
    ctor5.p1; // C1
}
else {
    ctor5.p2; // C2
}

var ctor6: C1 | C2 | C3;
if (ctor6 instanceof C1 || ctor6 instanceof C2) {
}
else {
    ctor6.p4; // C3
}

//// [typeGuardOfFormInstanceOf.js]
// A type guard of the form x instanceof C, where C is of a subtype of the global type 'Function' 
// and C has a property named 'prototype'
//  - when true, narrows the type of x to the type of the 'prototype' property in C provided 
//    it is a subtype of the type of x, or
//  - when false, has no effect on the type of x.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var D1 = /** @class */ (function (_super) {
    __extends(D1, _super);
    function D1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D1;
}(C1));
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var str;
var num;
var strOrNum;
var ctor1;
str = ctor1 instanceof C1 && ctor1.p1; // C1
num = ctor1 instanceof C2 && ctor1.p2; // C2
str = ctor1 instanceof D1 && ctor1.p1; // D1
num = ctor1 instanceof D1 && ctor1.p3; // D1
var ctor2;
num = ctor2 instanceof C2 && ctor2.p2; // C2
num = ctor2 instanceof D1 && ctor2.p3; // D1
str = ctor2 instanceof D1 && ctor2.p1; // D1
var r2 = ctor2 instanceof C1 && ctor2; // C2 | D1
var ctor3;
if (ctor3 instanceof C1) {
    ctor3.p1; // C1
}
else {
    ctor3.p2; // C2
}
var ctor4;
if (ctor4 instanceof C1) {
    ctor4.p1; // C1
}
else if (ctor4 instanceof C2) {
    ctor4.p2; // C2
}
else {
    ctor4.p4; // C3
}
var ctor5;
if (ctor5 instanceof C1) {
    ctor5.p1; // C1
}
else {
    ctor5.p2; // C2
}
var ctor6;
if (ctor6 instanceof C1 || ctor6 instanceof C2) {
}
else {
    ctor6.p4; // C3
}
