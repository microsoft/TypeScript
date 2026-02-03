//// [tests/cases/compiler/erasableSyntaxOnly2.ts] ////

//// [index.ts]
let a = (<unknown function foo() {});
let b = <unknown 123;
let c = <unknown

//// [index.js]
var a = function foo() { };
var b = 123;
var c = ;
