/// <reference path='fourslash.ts'/>

////class C {
////    constructor();
////    constructor(x);
////    /*1*/foo/*2*/(x, y) { }
////}

verify.errorExistsBetweenMarkers('1', '2');