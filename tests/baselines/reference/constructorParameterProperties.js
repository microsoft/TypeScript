//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorParameterProperties.ts] ////

//// [constructorParameterProperties.ts]
class C {
    y: string;
    constructor(private x: string, protected z: string) { }
}

declare var c: C;
var r = c.y;
var r2 = c.x; // error
var r3 = c.z; // error

class D<T> {
    y: T;
    constructor(a: T, private x: T, protected z: T) { }
}

declare var d: D<string>;
var r = d.y;
var r2 = d.x; // error
var r3 = d.a; // error
var r4 = d.z; // error


//// [constructorParameterProperties.js]
var C = /** @class */ (function () {
    function C(x, z) {
        this.x = x;
        this.z = z;
    }
    return C;
}());
var r = c.y;
var r2 = c.x; // error
var r3 = c.z; // error
var D = /** @class */ (function () {
    function D(a, x, z) {
        this.x = x;
        this.z = z;
    }
    return D;
}());
var r = d.y;
var r2 = d.x; // error
var r3 = d.a; // error
var r4 = d.z; // error
