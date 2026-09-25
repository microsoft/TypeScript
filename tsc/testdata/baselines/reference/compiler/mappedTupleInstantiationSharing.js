//// [tests/cases/compiler/mappedTupleInstantiationSharing.ts] ////

//// [mappedTupleInstantiationSharing.ts]
type Select<T, I extends (keyof T)[]> = { [K in keyof I]: T[I[K]] };
interface Box<T extends unknown[]> {
    value: T;
    callback: (...args: T) => T;
}
type Boxes<Tag> = Tag extends unknown ? Box<Select<[Tag, string], [1]>> : never;
declare const boxes: Boxes<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>;
const result: [string] = boxes.callback("hello");


//// [mappedTupleInstantiationSharing.js]
"use strict";
const result = boxes.callback("hello");
