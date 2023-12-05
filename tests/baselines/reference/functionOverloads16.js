//// [tests/cases/compiler/functionOverloads16.ts] ////

//// [functionOverloads16.ts]
function foo(foo:{a:string;}):string;
function foo(foo:{a:string;}):number;
function foo(foo:{a:string; b?:number;}):any { return "" }


//// [functionOverloads16.js]
function foo(foo) { return ""; }
