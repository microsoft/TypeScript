//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractGeneric.ts] ////

//// [classAbstractGeneric.ts]
abstract class A<T> {
    t: T;
    
    abstract foo(): T;
    abstract bar(t: T);
}

abstract class B<T> extends A<T> {}

class C<T> extends A<T> {} // error -- inherits abstract methods

class D extends A<number> {} // error -- inherits abstract methods

class E<T> extends A<T> { // error -- doesn't implement bar
    foo() { return this.t; }
}

class F<T> extends A<T> { // error -- doesn't implement foo
    bar(t : T) {}
}

class G<T> extends A<T> {
    foo() { return this.t; }
    bar(t: T) { }
}

//// [classAbstractGeneric.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A)); // error -- inherits abstract methods
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(A)); // error -- inherits abstract methods
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    E.prototype.foo = function () { return this.t; };
    return E;
}(A));
var F = /** @class */ (function (_super) {
    __extends(F, _super);
    function F() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    F.prototype.bar = function (t) { };
    return F;
}(A));
var G = /** @class */ (function (_super) {
    __extends(G, _super);
    function G() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    G.prototype.foo = function () { return this.t; };
    G.prototype.bar = function (t) { };
    return G;
}(A));
