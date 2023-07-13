//// [tests/cases/compiler/functionOverloads20.ts] ////

//// [functionOverloads20.ts]
function foo(bar:{a:number;}): number;
function foo(bar:{a:string;}): string;
function foo(bar:{a:any;}): string {return ""}


//// [functionOverloads20.js]
function foo(bar) { return ""; }
