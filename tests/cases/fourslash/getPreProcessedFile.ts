/// <reference path="fourslash.ts" />
// @ModuleResolution: classic

// @Filename: refFile1.ts
//// class D { }

// @Filename: refFile2.ts
//// export class E {}

// @Filename: main.ts
// @ResolveReference: true
//// ///<reference path="refFile1.ts" />
//// ///<reference path = "/*1*/NotExistRef.ts/*2*/" />
//// /*3*////<reference path "invalidRefFile1.ts" />/*4*/
//// import ref2 = require("refFile2");
//// import noExistref2 = require(/*5*/"NotExistRefFile2"/*6*/);
//// import invalidRef1  /*7*/require/*8*/("refFile2");
//// import invalidRef2 = /*9*/requi/*10*/(/*10A*/"refFile2");
//// var obj: /*11*/C/*12*/;
//// var obj1: D;
//// var obj2: ref2.E;

goTo.file("main.ts");
verify.numberOfErrorsInCurrentFile(7);
verify.errorExistsBetweenMarkers("1", "2");
verify.errorExistsBetweenMarkers("3", "4");
verify.errorExistsBetweenMarkers("5", "6");
verify.errorExistsBetweenMarkers("7", "8");
verify.errorExistsBetweenMarkers("9", "10");
verify.errorExistsBetweenMarkers("10", "10A");
verify.errorExistsBetweenMarkers("11", "12");
