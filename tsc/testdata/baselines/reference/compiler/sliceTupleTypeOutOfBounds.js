//// [tests/cases/compiler/sliceTupleTypeOutOfBounds.ts] ////

//// [sliceTupleTypeOutOfBounds.ts]
type Middle<T> = T extends [unknown, ... infer X, unknown] ? X: never;
type Example = Middle<[1]>;


//// [sliceTupleTypeOutOfBounds.js]
"use strict";
