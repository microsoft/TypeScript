// @target: esnext
// @lib: es2025,es2026.collection
// @noEmit: true
// @strict: true

const map = new Map<string, number>();
const inserted: number = map.getOrInsert("a", 1);
const computed: number = map.getOrInsertComputed("b", key => key.length);

const weakMap = new WeakMap<object, number>();
const key = {};
const weakInserted: number = weakMap.getOrInsert(key, 1);
const weakComputed: number = weakMap.getOrInsertComputed(key, value => value === key ? 1 : 0);

declare const readonlyMap: ReadonlyMap<string, number>;
readonlyMap.getOrInsert("a", 1);
