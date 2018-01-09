/// <reference path="fourslash.ts"/>

// Squiggle for implementing a derived class with an incompatible override is too large

//// class Foo { xyz: string; }
//// class Bar extends Foo { /*1*/xyz/*2*/: number; }
//// class Baz extends Foo { public /*3*/xyz/*4*/: number; }
//// class /*5*/Baf/*6*/ extends Foo {
////    constructor(public xyz: number) {
////       super();
////    }
//// }

verify.errorExistsBetweenMarkers('1', '2');
verify.errorExistsBetweenMarkers('3', '4');
verify.errorExistsBetweenMarkers('5', '6');
verify.numberOfErrorsInCurrentFile(3);