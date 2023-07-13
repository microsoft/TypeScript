//// [tests/cases/compiler/functionOverloads25.ts] ////

//// [functionOverloads25.ts]
function foo():string;
function foo(bar:string):number;
function foo(bar?:any):any{ return '' };
var x = foo();


//// [functionOverloads25.js]
function foo(bar) { return ''; }
;
var x = foo();
