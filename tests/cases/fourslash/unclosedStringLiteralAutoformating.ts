/// <reference path='fourslash.ts' />

////var x = /*1*/"asd/*2*/
////class Foo {
////    /**/

//verify.errorExistsBetweenMarkers("1", "2");
goTo.marker();
edit.insert("}");
verify.currentLineContentIs("}");