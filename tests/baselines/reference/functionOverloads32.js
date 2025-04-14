//// [tests/cases/compiler/functionOverloads32.ts] ////

//// [functionOverloads32.ts]
function foo(bar:string):string;
function foo(bar:number):number;
function foo(bar:any):any{ return bar }
var baz:number; var x = foo(baz);


//// [functionOverloads32.js]
function foo(bar) { return bar; }
var baz;
var x = foo(baz);
