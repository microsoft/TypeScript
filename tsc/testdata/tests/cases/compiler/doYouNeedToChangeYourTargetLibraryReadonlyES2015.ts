// @target: es2015
// @lib: es5, es2015.collection
// @noEmit: true
// @noTypesAndSymbols: true

declare const array: ReadonlyArray<number>;
array.find;
array.findIndex;
array.entries;
array.keys;
array.values;

declare const map: ReadonlyMap<string, number>;
map.entries;
map.keys;
map.values;

declare const set: ReadonlySet<number>;
set.entries;
set.keys;
set.values;

([1, 2, 3] as const).fill;
