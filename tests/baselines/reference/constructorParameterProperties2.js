//// [constructorParameterProperties2.ts]
class C {
    y: number;
    constructor(y: number) { } // ok
}

var c: C;
var r = c.y;

class D {
    y: number;
    constructor(public y: number) { } // error
}

var d: D;
var r2 = d.y;

class E {
    y: number;
    constructor(private y: number) { } // error
}

var e: E;
var r3 = e.y; // error

class F {
    y: number;
    constructor(protected y: number) { } // error
}

var f: F;
var r4 = f.y; // error


//// [constructorParameterProperties2.js]
var C = /** @class */ (function () {
    function C(y) {
    } // ok
    return C;
}());
var c;
var r = c.y;
var D = /** @class */ (function () {
    function D(y) {
        this.y = y;
    } // error
    return D;
}());
var d;
var r2 = d.y;
var E = /** @class */ (function () {
    function E(y) {
        this.y = y;
    } // error
    return E;
}());
var e;
var r3 = e.y; // error
var F = /** @class */ (function () {
    function F(y) {
        this.y = y;
    } // error
    return F;
}());
var f;
var r4 = f.y; // error
