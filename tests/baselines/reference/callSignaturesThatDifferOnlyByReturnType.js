//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/callSignaturesThatDifferOnlyByReturnType.ts] ////

//// [callSignaturesThatDifferOnlyByReturnType.ts]
// Each pair of signatures in these types has a signature that should cause an error. 
// Overloads, generic or not, that differ only by return type are an error.
interface I {
    (x): number;
    (x): void; // error
    <T>(x: T): number;
    <T>(x: T): string; // error
}

interface I2 {
    <T>(x: T): number;
    <T>(x: T): string; // error
}

interface I3<T> {
    (x: T): number;
    (x: T): string; // error
}

var a: {
    (x, y): Object;
    (x, y): any; // error
}

var a2: {
    <T>(x: T): number;
    <T>(x: T): string; // error
}

//// [callSignaturesThatDifferOnlyByReturnType.js]
var a;
var a2;
