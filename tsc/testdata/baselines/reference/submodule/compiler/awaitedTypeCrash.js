//// [tests/cases/compiler/awaitedTypeCrash.ts] ////

//// [awaitedTypeCrash.ts]
// https://github.com/microsoft/TypeScript/issues/51984
async function* f<T extends Promise<never>>(): AsyncGenerator<T, void, void> { }

//// [awaitedTypeCrash.js]
async function* f() { }
