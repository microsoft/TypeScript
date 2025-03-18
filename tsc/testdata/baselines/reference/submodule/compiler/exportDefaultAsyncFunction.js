//// [tests/cases/compiler/exportDefaultAsyncFunction.ts] ////

//// [exportDefaultAsyncFunction.ts]
export default async function foo(): Promise<void> {}
foo();


//// [exportDefaultAsyncFunction.js]
export default async function foo() { }
foo();
