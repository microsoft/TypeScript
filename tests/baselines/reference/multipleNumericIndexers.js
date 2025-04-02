//// [tests/cases/conformance/types/objectTypeLiteral/indexSignatures/multipleNumericIndexers.ts] ////

//// [multipleNumericIndexers.ts]
// Multiple indexers of the same type are an error

class C {
    [x: number]: string;
    [x: number]: string;
}

interface I {
    [x: number]: string;
    [x: number]: string;
}

var a: {
    [x: number]: string;
    [x: number]: string;
}

var b: {
    [x: number]: string;
    [x: number]: string
} = { 1: '', "2": '' }

class C2<T> {
    [x: number]: string;
    [x: number]: string;
}

interface I<T> {
    [x: number]: string;
    [x: number]: string;
}


//// [multipleNumericIndexers.js]
// Multiple indexers of the same type are an error
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
var b = { 1: '', "2": '' };
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
