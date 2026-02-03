//// [tests/cases/conformance/types/typeRelationships/typeInference/genericCallWithObjectTypeArgsAndConstraints3.ts] ////

//// [genericCallWithObjectTypeArgsAndConstraints3.ts]
// Generic call with constraints infering type parameter from object member properties

class Base {
    x: string;
}
class Derived extends Base {
    y: string;
}
class Derived2 extends Base {
    z: string;
}

function f<T extends Base>(a: { x: T; y: T }) {
    var r: T;
    return r;
}

var r1 = f({ x: new Derived(), y: new Derived2() }); // error because neither is supertype of the other

function f2<T extends Base, U extends { x: T; y: T }>(a: U) {
    var r: T;
    return r;
}

var r2 = f2({ x: new Derived(), y: new Derived2() }); // ok
var r3 = f2({ x: new Derived(), y: new Derived2() }); // ok


function f3<T extends Base>(y: (a: T) => T, x: T) {
    return y(null);
}

// all ok - second argument is processed before x is fixed
var r4 = f3(x => x, new Base());
var r5 = f3(x => x, new Derived());
var r6 = f3(x => x, null);


//// [genericCallWithObjectTypeArgsAndConstraints3.js]
// Generic call with constraints infering type parameter from object member properties
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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base));
function f(a) {
    var r;
    return r;
}
var r1 = f({ x: new Derived(), y: new Derived2() }); // error because neither is supertype of the other
function f2(a) {
    var r;
    return r;
}
var r2 = f2({ x: new Derived(), y: new Derived2() }); // ok
var r3 = f2({ x: new Derived(), y: new Derived2() }); // ok
function f3(y, x) {
    return y(null);
}
// all ok - second argument is processed before x is fixed
var r4 = f3(function (x) { return x; }, new Base());
var r5 = f3(function (x) { return x; }, new Derived());
var r6 = f3(function (x) { return x; }, null);
