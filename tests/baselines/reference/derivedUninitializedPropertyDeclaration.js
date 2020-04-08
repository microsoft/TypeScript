//// [derivedUninitializedPropertyDeclaration.ts]
class A {
    property = 'x';
    m() { return 1 }
}
class B extends A {
    property: any; // error
}
class BD extends A {
    declare property: any; // ok because it's implicitly initialised
}
class BDBang extends A {
    declare property!: any; // ! is not allowed, this is an ambient declaration
}
class BOther extends A {
    declare m() { return 2 } // not allowed on methods
    declare nonce: any; // ok, even though it's not in the base
    declare property = 'y' // initialiser not allowed with declare
}
class U {
    declare nonce: any; // ok, even though there's no base
}

class C {
    p: string;
}
class D extends C {
    p: 'hi'; // error
}
class DD extends C {
    declare p: 'bye'; // ok
}


declare class E {
    p1: string
    p2: string
}
class F extends E {
    p1!: 'z'
    declare p2: 'alpha'
}

class G extends E {
    p1: 'z'
    constructor() {
        super()
        this.p1 = 'z'
    }
}

abstract class H extends E {
    abstract p1: 'a' | 'b' | 'c'
    declare abstract p2: 'a' | 'b' | 'c'
}

interface I {
    q: number
}
interface J extends I { }
class J {
    r = 5
}
class K extends J {
    q!: 1 | 2 | 3 // ok, extends a property from an interface
    r!: 4 | 5 // error, from class
}

// #35327
class L {
    a: any;
    constructor(arg: any) {
        this.a = arg;
    }
}
class M extends L {
    declare a: number;
    constructor(arg: number) {
        super(arg);
        console.log(this.a);  // should be OK, M.a is ambient
    }
}


//// [derivedUninitializedPropertyDeclaration.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
        this.property = 'x';
    }
    A.prototype.m = function () { return 1; };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var BD = /** @class */ (function (_super) {
    __extends(BD, _super);
    function BD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BD;
}(A));
var BDBang = /** @class */ (function (_super) {
    __extends(BDBang, _super);
    function BDBang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BDBang;
}(A));
var BOther = /** @class */ (function (_super) {
    __extends(BOther, _super);
    function BOther() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BOther.prototype.m = function () { return 2; }; // not allowed on methods
    return BOther;
}(A));
var U = /** @class */ (function () {
    function U() {
    }
    return U;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DD;
}(C));
var F = /** @class */ (function (_super) {
    __extends(F, _super);
    function F() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return F;
}(E));
var G = /** @class */ (function (_super) {
    __extends(G, _super);
    function G() {
        var _this = _super.call(this) || this;
        _this.p1 = 'z';
        return _this;
    }
    return G;
}(E));
var H = /** @class */ (function (_super) {
    __extends(H, _super);
    function H() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return H;
}(E));
var J = /** @class */ (function () {
    function J() {
        this.r = 5;
    }
    return J;
}());
var K = /** @class */ (function (_super) {
    __extends(K, _super);
    function K() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return K;
}(J));
// #35327
var L = /** @class */ (function () {
    function L(arg) {
        this.a = arg;
    }
    return L;
}());
var M = /** @class */ (function (_super) {
    __extends(M, _super);
    function M(arg) {
        var _this = _super.call(this, arg) || this;
        console.log(_this.a); // should be OK, M.a is ambient
        return _this;
    }
    return M;
}(L));
