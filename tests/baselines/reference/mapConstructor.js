//// [tests/cases/compiler/mapConstructor.ts] ////

//// [mapConstructor.ts]
new Map();

const potentiallyUndefinedIterable = [['1', 1], ['2', 2]] as Iterable<[string, number]> | undefined;
new Map(potentiallyUndefinedIterable);

const potentiallyNullIterable = [['1', 1], ['2', 2]] as Iterable<[string, number]> | null;
new Map(potentiallyNullIterable);

//// [mapConstructor.js]
"use strict";
new Map();
const potentiallyUndefinedIterable = [['1', 1], ['2', 2]];
new Map(potentiallyUndefinedIterable);
const potentiallyNullIterable = [['1', 1], ['2', 2]];
new Map(potentiallyNullIterable);
