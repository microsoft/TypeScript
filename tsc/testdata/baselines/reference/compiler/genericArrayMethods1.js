//// [tests/cases/compiler/genericArrayMethods1.ts] ////

//// [genericArrayMethods1.ts]
var x:string[] =  [0,1].slice(0); // this should be an error


//// [genericArrayMethods1.js]
"use strict";
var x = [0, 1].slice(0); // this should be an error
