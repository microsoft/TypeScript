//// [mapConstructorOnReadonlyTuple.ts]
const pairs = [['1', 1], ['2', 2]] as const
new Map(pairs);

//// [mapConstructorOnReadonlyTuple.js]
const pairs = [['1', 1], ['2', 2]];
new Map(pairs);
