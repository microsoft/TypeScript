//// [tests/cases/compiler/functionOverloads34.ts] ////

//// [functionOverloads34.ts]
function foo(bar:{a:number;}):string;
function foo(bar:{a:boolean;}):number;
function foo(bar:{a:any;}):any{ return bar }
var x = foo();


//// [functionOverloads34.js]
function foo(bar) { return bar; }
var x = foo();
