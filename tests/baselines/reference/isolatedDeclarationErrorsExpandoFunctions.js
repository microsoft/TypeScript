//// [tests/cases/compiler/isolatedDeclarationErrorsExpandoFunctions.ts] ////

//// [isolatedDeclarationErrorsExpandoFunctions.ts]
export function foo() {}

foo.apply = () => {}
foo.call = ()=> {}
foo.bind = ()=> {}
foo.caller = ()=> {}
foo.toString = ()=> {}
foo.length = 10
foo.length = 10


//// [isolatedDeclarationErrorsExpandoFunctions.js]
export function foo() { }
foo.apply = () => { };
foo.call = () => { };
foo.bind = () => { };
foo.caller = () => { };
foo.toString = () => { };
foo.length = 10;
foo.length = 10;
