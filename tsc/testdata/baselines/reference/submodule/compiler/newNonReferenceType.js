//// [tests/cases/compiler/newNonReferenceType.ts] ////

//// [newNonReferenceType.ts]
var a = new any();
var b = new boolean(); // error


//// [newNonReferenceType.js]
"use strict";
var a = new any();
var b = new boolean(); // error
