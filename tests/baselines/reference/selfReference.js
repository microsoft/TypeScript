//// [tests/cases/compiler/selfReference.ts] ////

//// [selfReference.ts]
declare function asFunction<T>(value: T): () => T;
asFunction(() => { return 1; });

//// [selfReference.js]
asFunction(function () { return 1; });
