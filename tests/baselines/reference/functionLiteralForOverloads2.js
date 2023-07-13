//// [tests/cases/conformance/types/specifyingTypes/typeLiterals/functionLiteralForOverloads2.ts] ////

//// [functionLiteralForOverloads2.ts]
// basic uses of function literals with constructor overloads

class C {
    constructor(x: string);
    constructor(x: number);
    constructor(x) { }
}

class D<T> {
    constructor(x: string);
    constructor(x: number);
    constructor(x) { }
}

var f: {
    new(x: string): C;
    new(x: number): C;
} = C;

var f2: {
    new<T>(x: string): C;
    new<T>(x: number): C;
} = C;

var f3: {
    new<T>(x: string): D<T>;
    new<T>(x: number): D<T>;
} = D;

//// [functionLiteralForOverloads2.js]
// basic uses of function literals with constructor overloads
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D(x) {
    }
    return D;
}());
var f = C;
var f2 = C;
var f3 = D;
