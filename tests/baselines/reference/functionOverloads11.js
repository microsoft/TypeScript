//// [tests/cases/compiler/functionOverloads11.ts] ////

//// [functionOverloads11.ts]
function foo():number;
function foo():string { return "" }


//// [functionOverloads11.js]
function foo() { return ""; }
