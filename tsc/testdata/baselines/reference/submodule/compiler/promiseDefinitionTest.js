//// [tests/cases/compiler/promiseDefinitionTest.ts] ////

//// [promiseDefinitionTest.ts]
class Promise<T> {}
async function foo() {}
const x = foo();


//// [promiseDefinitionTest.js]
class Promise {
}
async function foo() { }
const x = foo();
