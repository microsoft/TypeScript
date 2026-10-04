//// [tests/cases/compiler/functionExpandoPropertyDeclaration.ts] ////

//// [functionExpandoPropertyDeclaration.ts]
const foo = () => {}
foo.bar = 42
export {}

//// [functionExpandoPropertyDeclaration.js]
const foo = () => { };
foo.bar = 42;
export {};


//// [functionExpandoPropertyDeclaration.d.ts]
export {};
