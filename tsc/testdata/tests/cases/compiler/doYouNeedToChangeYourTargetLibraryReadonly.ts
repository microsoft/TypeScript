// @target: es2015, esnext
// @noEmit: true
// @noTypesAndSymbols: true

declare const array: ReadonlyArray<number>;
array.find;
array.findIndex;
array.entries;
array.keys;
array.values;
array.includes;
array.flat;
array.flatMap;
array.at;
array.findLastIndex;
array.findLast;
array.toReversed;
array.toSorted;
array.toSpliced;
array.with;

declare const readonlyArray: readonly number[];
readonlyArray.toReversed;
([1, 2, 3] as const).toReversed();

declare const tuple: [number, string];
tuple.toReversed;

function f<T extends readonly number[]>(value: T) {
    value.toReversed;
}

declare const map: ReadonlyMap<string, number>;
map.entries;
map.keys;
map.values;

declare const set: ReadonlySet<number>;
set.entries;
set.keys;
set.values;
set.union;
set.intersection;
set.difference;
set.symmetricDifference;
set.isSubsetOf;
set.isSupersetOf;
set.isDisjointFrom;

array.fill;
array.copyWithin;
array.notAnArrayMethod;
map.getOrInsert;
map.getOrInsertComputed;
