// @target: esnext
// @noEmit: true
// @strictBuiltinIteratorReturn: *

declare const array: number[];
declare const map: Map<string, number>;
declare const set: Set<number>;

const i0 = array[Symbol.iterator]();
const i1 = array.values();
const i2 = array.keys();
const i3 = array.entries();
for (const x of array);

const i4 = map[Symbol.iterator]();
const i5 = map.values();
const i6 = map.keys();
const i7 = map.entries();
for (const x of map);

const i8 = set[Symbol.iterator]();
const i9 = set.values();
const i10 = set.keys();
const i11 = set.entries();
for (const x of set);

declare const i12: IterableIterator<number, undefined>;
declare const i13: IterableIterator<number, any>;
declare const i14: IterableIterator<number, boolean>;
declare const i15: Iterable<number, undefined>;
declare const i16: Iterable<number, any>;
declare const i17: Iterable<number, boolean>;
