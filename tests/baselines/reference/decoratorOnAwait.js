//// [tests/cases/conformance/decorators/invalid/decoratorOnAwait.ts] ////

//// [decoratorOnAwait.ts]
declare function dec<T>(target: T): T;

@dec
await 1


//// [decoratorOnAwait.js]
await 1;
