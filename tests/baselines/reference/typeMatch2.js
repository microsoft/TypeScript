//// [tests/cases/compiler/typeMatch2.ts] ////

//// [typeMatch2.ts]
function f1() {
	var a = { x: 1, y: 2 };
	a = {}; // error
    a = { x: 1 }; // error
	a = { x: 1, y: 2, z: 3 };
    a = { x: 1, z: 3 };  // error
}

class Animal { private a; }
class Giraffe extends Animal { private g; }

function f2() {
    var a = new Animal();
    var g = new Giraffe();
    var aa = [ a, a, a ];
    var gg = [ g, g, g ];
    aa = gg;
    gg = aa; // error
    var xa = { f1: 5, f2: aa };
    var xb = { f1: 5, f2: gg };
    xa = xb; // Should be ok
    xb = xa; // Not ok
}

function f4() {
    var _any: any = 0;
    var i = 5;
    i = null; 
    i = undefined;
    var a = { x: 1, y: 1 };
    a = { x: 1, y: null }; 
    a = { x: 1, y: undefined }; 
    a = { x: 1, y: _any }; 
    a = { x: 1, y: _any, z:1 }; 
    a = { x: 1 }; // error
    var mf = function m(n) { return false; };
    var zf = function z(n: number) { return true; };
    mf=zf;
    mf(_any);
    zf(_any);
}




//// [typeMatch2.js]
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
function f1() {
    var a = { x: 1, y: 2 };
    a = {}; // error
    a = { x: 1 }; // error
    a = { x: 1, y: 2, z: 3 };
    a = { x: 1, z: 3 }; // error
}
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Giraffe = /** @class */ (function (_super) {
    __extends(Giraffe, _super);
    function Giraffe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Giraffe;
}(Animal));
function f2() {
    var a = new Animal();
    var g = new Giraffe();
    var aa = [a, a, a];
    var gg = [g, g, g];
    aa = gg;
    gg = aa; // error
    var xa = { f1: 5, f2: aa };
    var xb = { f1: 5, f2: gg };
    xa = xb; // Should be ok
    xb = xa; // Not ok
}
function f4() {
    var _any = 0;
    var i = 5;
    i = null;
    i = undefined;
    var a = { x: 1, y: 1 };
    a = { x: 1, y: null };
    a = { x: 1, y: undefined };
    a = { x: 1, y: _any };
    a = { x: 1, y: _any, z: 1 };
    a = { x: 1 }; // error
    var mf = function m(n) { return false; };
    var zf = function z(n) { return true; };
    mf = zf;
    mf(_any);
    zf(_any);
}
