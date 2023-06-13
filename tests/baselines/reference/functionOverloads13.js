//// [tests/cases/compiler/functionOverloads13.ts] ////

//// [functionOverloads13.ts]
function foo(bar:number):string;
function foo(bar:number):number;
function foo(bar?:number):any { return "" }


//// [functionOverloads13.js]
function foo(bar) { return ""; }
