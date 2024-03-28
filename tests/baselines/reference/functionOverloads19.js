//// [tests/cases/compiler/functionOverloads19.ts] ////

//// [functionOverloads19.ts]
function foo(bar:{b:string;});
function foo(bar:{a:string;});
function foo(bar:{a:any;}) { return {a:""} }


//// [functionOverloads19.js]
function foo(bar) { return { a: "" }; }
