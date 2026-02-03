//// [tests/cases/compiler/strictModeReservedWordInClassDeclaration.ts] ////

//// [strictModeReservedWordInClassDeclaration.ts]
interface public { }

class Foo {
    constructor(private, public, static) {
        private = public = static;
    }
    public banana(x: public) { }
}

class C {
    constructor(public public, let) {
    }
    foo1(private, static, public) {
        function let() { }
        var z = function let() { };
    }

    public pulbic() { } // No Error;
}

class D<public, private>{ }

class E implements public { }

class F implements public.private.B { }
class F1 implements public.private.implements { }
class G extends package { }
class H extends package.A { }

//// [strictModeReservedWordInClassDeclaration.js]
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
var Foo = /** @class */ (function () {
    function Foo(private, public, static) {
        private = public = static;
    }
    Foo.prototype.banana = function (x) { };
    return Foo;
}());
var C = /** @class */ (function () {
    function C(public, let) {
        this.public = public;
    }
    C.prototype.foo1 = function (private, static, public) {
        function let() { }
        var z = function let() { };
    };
    C.prototype.pulbic = function () { }; // No Error;
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    return E;
}());
var F = /** @class */ (function () {
    function F() {
    }
    return F;
}());
var F1 = /** @class */ (function () {
    function F1() {
    }
    return F1;
}());
var G = /** @class */ (function (_super) {
    __extends(G, _super);
    function G() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return G;
}(package));
var H = /** @class */ (function (_super) {
    __extends(H, _super);
    function H() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return H;
}(package.A));
