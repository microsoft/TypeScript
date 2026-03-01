//// [tests/cases/compiler/functionType.ts] ////

//// [functionType.ts]
function salt() {}
salt.apply("hello", []);
(new Function("return 5"))();
 
 


//// [functionType.js]
"use strict";
function salt() { }
salt.apply("hello", []);
(new Function("return 5"))();
