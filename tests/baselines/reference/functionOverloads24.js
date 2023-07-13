//// [tests/cases/compiler/functionOverloads24.ts] ////

//// [functionOverloads24.ts]
function foo(bar:number):(b:string)=>void;
function foo(bar:string):(a:number)=>void;
function foo(bar:any):(a)=>void { return function(){} }


//// [functionOverloads24.js]
function foo(bar) { return function () { }; }
