//// [tests/cases/compiler/mapConstructorOnReadonlyTuple.ts] ////

//// [mapConstructorOnReadonlyTuple.ts]
const pairs = [[{}, 1], [{}, 2]] as const;
new Map(pairs);
new WeakMap(pairs);


//// [mapConstructorOnReadonlyTuple.js]
const pairs = [[{}, 1], [{}, 2]];
new Map(pairs);
new WeakMap(pairs);
