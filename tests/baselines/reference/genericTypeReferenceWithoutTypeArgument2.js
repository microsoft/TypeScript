//// [genericTypeReferenceWithoutTypeArgument2.ts]
// it is an error to use a generic type without type arguments
// all of these are errors 

interface I<T> {
    foo: T;
}

var c: I;

var a: { x: I };
var b: { (x: I): I };
var d: { [x: I]: I };

var e = (x: I) => { var y: I; return y; }

function f(x: I): I { var y: I; return y; }

var g = function f(x: I): I { var y: I; return y; }

class D extends I {
}

interface U extends I {}

module M {
    export interface E<T> { foo: T }
}

class D2 extends M.C { }
interface D3<T extends M.E> { }
interface I2 extends M.C { }

function h<T extends I>(x: T) { }
function i<T extends M.E>(x: T) { }

var j = <C>null;
var k = <M.E>null;

//// [genericTypeReferenceWithoutTypeArgument2.js]
// it is an error to use a generic type without type arguments
// all of these are errors 
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
var c;
var a;
var b;
var d;
var e = function (x) { var y; return y; };
function f(x) { var y; return y; }
var g = function f(x) { var y; return y; };
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(I));
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(M.C));
function h(x) { }
function i(x) { }
var j = null;
var k = null;
