//// [tests/cases/compiler/functionOverloads17.ts] ////

//// [functionOverloads17.ts]
function foo():{a:number;}
function foo():{a:string;} { return {a:""} }


//// [functionOverloads17.js]
function foo() { return { a: "" }; }
