//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/callSignaturesThatDifferOnlyByReturnType2.ts] ////

//// [callSignaturesThatDifferOnlyByReturnType2.ts]
// Normally it is an error to have multiple overloads which differ only by return type in a single type declaration.
// Here the multiple overloads come from multiple bases.

interface I<T> {
    foo(x: number): T;
}

interface A extends I<number>, I<string> { }

var x: A;
// BUG 822524
var r = x.foo(1); // no error
var r2 = x.foo(''); // error


//// [callSignaturesThatDifferOnlyByReturnType2.js]
// Normally it is an error to have multiple overloads which differ only by return type in a single type declaration.
// Here the multiple overloads come from multiple bases.
var x;
// BUG 822524
var r = x.foo(1); // no error
var r2 = x.foo(''); // error
