//// [tests/cases/compiler/functionOverloads30.ts] ////

//// [functionOverloads30.ts]
function foo(bar:string):string;
function foo(bar:number):number;
function foo(bar:any):any{ return bar }
var x = foo('bar');


//// [functionOverloads30.js]
function foo(bar) { return bar; }
var x = foo('bar');
