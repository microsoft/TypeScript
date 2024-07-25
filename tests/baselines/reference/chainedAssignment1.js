//// [tests/cases/compiler/chainedAssignment1.ts] ////

//// [chainedAssignment1.ts]
class X {
    constructor(public z) { }
    a: number;
}

class Y {
    constructor(public z) {
    }
    a: number;
    b: string;
}

class Z {
    z: any;
    c: string;
}

var c1 = new X(3);
var c2 = new Y(5);
var c3 = new Z();
c1 = c2 = c3; // a bug made this not report the same error as below
c2 = c3; // Error TS111: Cannot convert Z to Y

//// [chainedAssignment1.js]
var X = /** @class */ (function () {
    function X(z) {
        this.z = z;
    }
    return X;
}());
var Y = /** @class */ (function () {
    function Y(z) {
        this.z = z;
    }
    return Y;
}());
var Z = /** @class */ (function () {
    function Z() {
    }
    return Z;
}());
var c1 = new X(3);
var c2 = new Y(5);
var c3 = new Z();
c1 = c2 = c3; // a bug made this not report the same error as below
c2 = c3; // Error TS111: Cannot convert Z to Y
