//// [tests/cases/conformance/types/objectTypeLiteral/methodSignatures/objectTypesWithOptionalProperties2.ts] ////

//// [objectTypesWithOptionalProperties2.ts]
// Illegal attempts to define optional methods

var a: {
    x()?: number; // error
}

interface I {
    x()?: number; // error
}

class C {
    x()?: number; // error
}

interface I2<T> {
    x()?: T; // error
}

class C2<T> {
    x()?: T; // error
}


var b = {
    x()?: 1 // error
}

//// [objectTypesWithOptionalProperties2.js]
var a;
class C {
    x() { }
    number;
}
class C2 {
    x() { }
    T;
}
var b = {
    x() { }, 1: 
};
