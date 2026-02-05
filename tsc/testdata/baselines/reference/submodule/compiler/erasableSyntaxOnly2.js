//// [tests/cases/compiler/erasableSyntaxOnly2.ts] ////

//// [index.ts]
let a = (<unknown function foo() {});
let b = <unknown 123;
let c = <unknown

//// [index.js]
"use strict";
let a = function foo() { };
let b = 123;
let c = ;
