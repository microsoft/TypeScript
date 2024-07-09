//// [tests/cases/compiler/functionOverloads27.ts] ////

//// [functionOverloads27.ts]
function foo():string;
function foo(bar:string):number;
function foo(bar?:any):any{ return '' }
var x = foo(5);


//// [functionOverloads27.js]
function foo(bar) { return ''; }
var x = foo(5);
