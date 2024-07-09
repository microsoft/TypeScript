//// [tests/cases/conformance/classes/members/constructorFunctionTypes/classWithBaseClassButNoConstructor.ts] ////

//// [classWithBaseClassButNoConstructor.ts]
class Base {
    constructor(x: number) { }
}

class C extends Base {
    foo: string;
}

var r = C;
var c = new C(); // error
var c2 = new C(1); // ok

class Base2<T,U> {
    constructor(x: T) { }
}

class D<T,U> extends Base2<T,U> {
    foo: U;
}

var r2 = D;
var d = new D(); // error
var d2 = new D(1); // ok

// specialized base class
class D2<T, U> extends Base2<string, number> {
    foo: U;
}

var r3 = D2;
var d3 = new D(); // error
var d4 = new D(1); // ok

class D3 extends Base2<string, number> {
    foo: string;
}

var r4 = D3;
var d5 = new D(); // error
var d6 = new D(1); // ok

//// [classWithBaseClassButNoConstructor.js]
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
    function Base(x) {
    }
    return Base;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(Base));
var r = C;
var c = new C(); // error
var c2 = new C(1); // ok
var Base2 = /** @class */ (function () {
    function Base2(x) {
    }
    return Base2;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(Base2));
var r2 = D;
var d = new D(); // error
var d2 = new D(1); // ok
// specialized base class
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(Base2));
var r3 = D2;
var d3 = new D(); // error
var d4 = new D(1); // ok
var D3 = /** @class */ (function (_super) {
    __extends(D3, _super);
    function D3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D3;
}(Base2));
var r4 = D3;
var d5 = new D(); // error
var d6 = new D(1); // ok
