//// [typeGuardOfFormIsType.ts]
class C1 {
    p1: string;
}
class C2 {
    p2: number;
}
class D1 extends C1 {
    p3: number;
}
var str: string;
var num: number;
var strOrNum: string | number;

function isC1(x: any): x is C1 {
    return true;
}

function isC2(x: any): x is C2 {
    return true;
}

function isD1(x: any): x is D1 {
    return true;
}

var c1Orc2: C1 | C2;
str = isC1(c1Orc2) && c1Orc2.p1; // C1
num = isC2(c1Orc2) && c1Orc2.p2; // C2
str = isD1(c1Orc2) && c1Orc2.p1; // D1
num = isD1(c1Orc2) && c1Orc2.p3; // D1

var c2Ord1: C2 | D1;
num = isC2(c2Ord1) && c2Ord1.p2; // C2
num = isD1(c2Ord1) && c2Ord1.p3; // D1
str = isD1(c2Ord1) && c2Ord1.p1; // D1
var r2: C2 | D1 = isC1(c2Ord1) && c2Ord1; // C2 | D1

//// [typeGuardOfFormIsType.js]
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
var str;
var num;
var strOrNum;
function isC1(x) {
    return true;
}
function isC2(x) {
    return true;
}
function isD1(x) {
    return true;
}
var c1Orc2;
str = isC1(c1Orc2) && c1Orc2.p1; // C1
num = isC2(c1Orc2) && c1Orc2.p2; // C2
str = isD1(c1Orc2) && c1Orc2.p1; // D1
num = isD1(c1Orc2) && c1Orc2.p3; // D1
var c2Ord1;
num = isC2(c2Ord1) && c2Ord1.p2; // C2
num = isD1(c2Ord1) && c2Ord1.p3; // D1
str = isD1(c2Ord1) && c2Ord1.p1; // D1
var r2 = isC1(c2Ord1) && c2Ord1; // C2 | D1
