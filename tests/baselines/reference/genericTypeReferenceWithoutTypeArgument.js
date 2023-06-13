//// [tests/cases/conformance/types/specifyingTypes/typeReferences/genericTypeReferenceWithoutTypeArgument.ts] ////

//// [genericTypeReferenceWithoutTypeArgument.ts]
// it is an error to use a generic type without type arguments
// all of these are errors 

class C<T> {
    foo: T;
}

var c: C;

var a: { x: C };
var b: { (x: C): C };
var d: { [x: C]: C };

var e = (x: C) => { var y: C; return y; }

function f(x: C): C { var y: C; return y; }

var g = function f(x: C): C { var y: C; return y; }

class D extends C {
}

interface I extends C {}

module M {
    export class E<T> { foo: T }
}

class D2 extends M.E { }
class D3<T extends M.E> { }
interface I2 extends M.E { }

function h<T extends C>(x: T) { }
function i<T extends M.E>(x: T) { }

var j = <C>null;
var k = <M.E>null;

//// [genericTypeReferenceWithoutTypeArgument.js]
// it is an error to use a generic type without type arguments
// all of these are errors 
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
    return C;
}());
var c;
var a;
var b;
var d;
var e = function (x) { var y; return y; };
function f(x) { var y; return y; }
var g = function f(x) { var y; return y; };
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
var M;
(function (M) {
    var E = /** @class */ (function () {
        function E() {
        }
        return E;
    }());
    M.E = E;
})(M || (M = {}));
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(M.E));
var D3 = /** @class */ (function () {
    function D3() {
    }
    return D3;
}());
function h(x) { }
function i(x) { }
var j = null;
var k = null;
