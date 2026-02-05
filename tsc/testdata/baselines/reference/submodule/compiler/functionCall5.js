//// [tests/cases/compiler/functionCall5.ts] ////

//// [functionCall5.ts]
namespace m1 { export class c1 { public a; }} 
function foo():m1.c1{return new m1.c1();}; 
var x = foo();

//// [functionCall5.js]
"use strict";
var m1;
(function (m1) {
    class c1 {
        a;
    }
    m1.c1 = c1;
})(m1 || (m1 = {}));
function foo() { return new m1.c1(); }
;
var x = foo();
