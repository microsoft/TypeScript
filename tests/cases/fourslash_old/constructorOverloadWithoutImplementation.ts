/// <reference path='fourslash.ts'/>

////class C {
////    constructor();
////    constructor(x);
////    /*1*/constructor/*2*/(x, y);
////}

verify.errorExistsBetweenMarkers('1', '2');