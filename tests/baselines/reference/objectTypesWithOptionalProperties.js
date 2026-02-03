//// [tests/cases/conformance/types/objectTypeLiteral/methodSignatures/objectTypesWithOptionalProperties.ts] ////

//// [objectTypesWithOptionalProperties.ts]
// Basic uses of optional properties

var a: {
    x?: number; // ok
}

interface I {
    x?: number; // ok
}

class C {
    x?: number; // ok
}

interface I2<T> {
    x?: T; // ok
}

class C2<T> {
    x?: T; // ok
}

var b = {
    x?: 1 // error
}

//// [objectTypesWithOptionalProperties.js]
// Basic uses of optional properties
var a;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var b = {
    x: 1 // error
};
