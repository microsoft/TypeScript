//// [tests/cases/compiler/superCallsInConstructor.ts] ////

//// [superCallsInConstructor.ts]
class C {
    foo() {}
    bar() {}
}

class Base {
    x: string;
}
 
class Derived extends Base {
    constructor() {
        with(new C()) {
            foo();
            super();
            bar();
        }

        try {} catch(e) { super(); }
    }
}

//// [superCallsInConstructor.js]
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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    C.prototype.bar = function () { };
    return C;
}());
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = this;
        with (new C()) {
            foo();
            _this = _super.call(this) || this;
            bar();
        }
        try { }
        catch (e) {
            _this = _super.call(this) || this;
        }
        return _this;
    }
    return Derived;
}(Base));
