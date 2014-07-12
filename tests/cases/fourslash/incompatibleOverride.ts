/// <reference path="fourslash.ts"/>

// Squiggle for implementing a derived class with an incompatible override is too large

//// class Foo { xyz: string; }
//// class /*1*/Bar/*2*/ extends Foo { xyz: number; }
//// class /*3*/Baz/*4*/ extends Foo { public xyz: number; }
//// class /*5*/Baf/*6*/ extends Foo {
////    constructor(public xyz: number) {
////       super();
////    }
//// }

verify.errorExistsBetweenMarkers('1', '2');
verify.errorExistsBetweenMarkers('3', '4');
verify.errorExistsBetweenMarkers('5', '6');
verify.numberOfErrorsInCurrentFile(3);