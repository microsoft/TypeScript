//// [typeGuardConstructor.ts]
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
class D2 extends D1 {
    p5: number
}

var a: C1;
if (a.constructor === D1) {
    a.p3;
}
if (a.constructor == D1) {
    a.p3;
}
if (D1 === a.constructor) {
    a.p3;
}
if (a["constructor"] === D1) {
    a.p3;
}
if (D1 === a["constructor"]) {
    a.p3;
}

var b: C1;
if (b.constructor === D2) {
    b.p3;
    b.p5;
}

var ctor3: C1 | C2;
if (ctor3.constructor ===  C1) {
    ctor3.p1; // C1
}
else {
    ctor3.p2; // C2
}

if (ctor3.constructor !==  C1) {
    ctor3.p2; // C1
}
else {
    ctor3.p1; // C2
}

var ctor4: C1 | C2 | C3;
if (ctor4.constructor ===  C1) {
    ctor4.p1; // C1
}
else if (ctor4.constructor ===  C2) {
    ctor4.p2; // C2
}
else {
    ctor4.p4; // C3
}





//// [typeGuardConstructor.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
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
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(D1));
var a;
if (a.constructor === D1) {
    a.p3;
}
if (a.constructor == D1) {
    a.p3;
}
if (D1 === a.constructor) {
    a.p3;
}
if (a["constructor"] === D1) {
    a.p3;
}
if (D1 === a["constructor"]) {
    a.p3;
}
var b;
if (b.constructor === D2) {
    b.p3;
    b.p5;
}
var ctor3;
if (ctor3.constructor === C1) {
    ctor3.p1; // C1
}
else {
    ctor3.p2; // C2
}
if (ctor3.constructor !== C1) {
    ctor3.p2; // C1
}
else {
    ctor3.p1; // C2
}
var ctor4;
if (ctor4.constructor === C1) {
    ctor4.p1; // C1
}
else if (ctor4.constructor === C2) {
    ctor4.p2; // C2
}
else {
    ctor4.p4; // C3
}
