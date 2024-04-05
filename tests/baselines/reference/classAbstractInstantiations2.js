//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractInstantiations2.ts] ////

//// [classAbstractInstantiations2.ts]
class A {
    // ...
}

abstract class B {
    foo(): number { return this.bar(); }
    abstract bar() : number;
}

new B; // error

var BB: typeof B = B;
var AA: typeof A = BB; // error, AA is not of abstract type.
new AA;

function constructB(Factory : typeof B) {
    new Factory; // error -- Factory is of type typeof B.
}

var BB = B;
new BB; // error -- BB is of type typeof B.

var x : any = C;
new x; // okay -- undefined behavior at runtime

class C extends B { } // error -- not declared abstract

abstract class D extends B { } // okay

class E extends B { // okay -- implements abstract method
    bar() { return 1; }
}

abstract class F extends B {
    abstract foo() : number;
    bar() { return 2; }
}

abstract class G {
    abstract qux(x : number) : string;
    abstract qux() : number;
    y : number;
    abstract quz(x : number, y : string) : boolean; // error -- declarations must be adjacent

    abstract nom(): boolean;
    nom(x : number): boolean; // error -- use of modifier abstract must match on all overloads.
}

class H { // error -- not declared abstract
    abstract baz() : number;
}

//// [classAbstractInstantiations2.js]
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
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function () { return this.bar(); };
    return B;
}());
new B; // error
var BB = B;
var AA = BB; // error, AA is not of abstract type.
new AA;
function constructB(Factory) {
    new Factory; // error -- Factory is of type typeof B.
}
var BB = B;
new BB; // error -- BB is of type typeof B.
var x = C;
new x; // okay -- undefined behavior at runtime
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B)); // error -- not declared abstract
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(B)); // okay
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    E.prototype.bar = function () { return 1; };
    return E;
}(B));
var F = /** @class */ (function (_super) {
    __extends(F, _super);
    function F() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    F.prototype.bar = function () { return 2; };
    return F;
}(B));
var G = /** @class */ (function () {
    function G() {
    }
    return G;
}());
var H = /** @class */ (function () {
    function H() {
    }
    return H;
}());
