//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/identicalCallSignatures3.ts] ////

//// [identicalCallSignatures3.ts]
// Normally it is an error to have multiple overloads with identical signatures in a single type declaration.
// Here the multiple overloads come from multiple merged declarations, so we do not report errors.

interface I {
    (x: number): string;
}

interface I {
    (x: number): string;
}

interface I2<T> {
    (x: number): string;
}

interface I2<T> {
    (x: number): string;
}

//// [identicalCallSignatures3.js]
// Normally it is an error to have multiple overloads with identical signatures in a single type declaration.
// Here the multiple overloads come from multiple merged declarations, so we do not report errors.
