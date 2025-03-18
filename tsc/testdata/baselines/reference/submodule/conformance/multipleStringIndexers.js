//// [tests/cases/conformance/types/objectTypeLiteral/indexSignatures/multipleStringIndexers.ts] ////

//// [multipleStringIndexers.ts]
// Multiple indexers of the same type are an error

class C {
    [x: string]: string;
    [x: string]: string;
}

interface I {
    [x: string]: string;
    [x: string]: string;
}

var a: {
    [x: string]: string;
    [x: string]: string;
}

var b: {
    [x: string]: string;
    [x: string]: string;
} = { y: '' }

class C2<T> {
    [x: string]: string;
    [x: string]: string;
}

interface I2<T> {
    [x: string]: string;
    [x: string]: string;
}

//// [multipleStringIndexers.js]
class C {
}
var a;
var b = { y: '' };
class C2 {
}
