//// [tests/cases/compiler/restParamsWithNonRestParams.ts] ////

//// [restParamsWithNonRestParams.ts]
function foo(...b:number[]){}
foo(); // ok
function foo2(a:string, ...b:number[]){}
foo2(); // should be an error
function foo3(a?:string, ...b:number[]){}
foo3(); // error but shouldn't be

//// [restParamsWithNonRestParams.js]
function foo(...b) { }
foo();
function foo2(a, ...b) { }
foo2();
function foo3(a, ...b) { }
foo3();
