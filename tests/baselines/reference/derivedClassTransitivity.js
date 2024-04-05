//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassTransitivity.ts] ////

//// [derivedClassTransitivity.ts]
// subclassing is not transitive when you can remove required parameters and add optional parameters

class C {
    foo(x: number) { }
}

class D extends C {
    foo() { } // ok to drop parameters
}

class E extends D {
    foo(x?: string) { } // ok to add optional parameters
}

var c: C;
var d: D;
var e: E;
c = e;
var r = c.foo(1);
var r2 = e.foo('');

//// [derivedClassTransitivity.js]
// subclassing is not transitive when you can remove required parameters and add optional parameters
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
    C.prototype.foo = function (x) { };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.prototype.foo = function () { }; // ok to drop parameters
    return D;
}(C));
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    E.prototype.foo = function (x) { }; // ok to add optional parameters
    return E;
}(D));
var c;
var d;
var e;
c = e;
var r = c.foo(1);
var r2 = e.foo('');
