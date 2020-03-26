//// [typeGuardConstructorDerivedClass.ts]
// Derived class with different structures
class C1 {
    property1: number;
}

class C2 extends C1 {
    property2: number;
}

let var1: C2 | string;
if (var1.constructor === C1) {
    var1; // never
    var1.property1; // error
}
if (var1.constructor === C2) {
    var1; // C2
    var1.property1; // number
}

// Derived classes with the same structure
class C3 {}

class C4 extends C3 {}

let var2: C4 | string;
if (var2.constructor === C3) {
    var2; // never
}
if (var2.constructor === C4) {
    var2; // C4
}

// Disjointly structured classes
class C5 {
    property1: number;
}

class C6 {
    property2: number;
}

let let3: C6 | string;
if (let3.constructor === C5) {
    let3; // never
}
if (let3.constructor === C6) {
    let3; // C6
}

// Classes with the same structure
class C7 {
    property1: number
}

class C8 {
    property1: number;
}

let let4: C8 | string;
if (let4.constructor === C7) {
    let4; // never
}
if (let4.constructor === C8) {
    let4; // C8
}


//// [typeGuardConstructorDerivedClass.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Derived class with different structures
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(C1));
var var1;
if (var1.constructor === C1) {
    var1; // never
    var1.property1; // error
}
if (var1.constructor === C2) {
    var1; // C2
    var1.property1; // number
}
// Derived classes with the same structure
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C4;
}(C3));
var var2;
if (var2.constructor === C3) {
    var2; // never
}
if (var2.constructor === C4) {
    var2; // C4
}
// Disjointly structured classes
var C5 = /** @class */ (function () {
    function C5() {
    }
    return C5;
}());
var C6 = /** @class */ (function () {
    function C6() {
    }
    return C6;
}());
var let3;
if (let3.constructor === C5) {
    let3; // never
}
if (let3.constructor === C6) {
    let3; // C6
}
// Classes with the same structure
var C7 = /** @class */ (function () {
    function C7() {
    }
    return C7;
}());
var C8 = /** @class */ (function () {
    function C8() {
    }
    return C8;
}());
var let4;
if (let4.constructor === C7) {
    let4; // never
}
if (let4.constructor === C8) {
    let4; // C8
}
