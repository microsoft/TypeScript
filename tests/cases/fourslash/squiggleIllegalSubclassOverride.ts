/// <reference path="fourslash.ts"/>

////class Foo {
////    public x: number;
////}
////
////class Bar extends Foo {
////    public /*1*/x/*2*/: string;
////}

verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);