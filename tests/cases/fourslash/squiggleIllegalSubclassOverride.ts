/// <reference path="fourslash.ts"/>

////class Foo {
////    public x: number;
////}
////
////class /*1*/Bar/*2*/ extends Foo {
////    public x: string;
////}

verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);