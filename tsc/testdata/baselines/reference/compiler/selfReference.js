//// [tests/cases/compiler/selfReference.ts] ////

//// [selfReference.ts]
declare function asFunction<T>(value: T): () => T;
asFunction(() => { return 1; });

//// [selfReference.js]
"use strict";
asFunction(() => { return 1; });
