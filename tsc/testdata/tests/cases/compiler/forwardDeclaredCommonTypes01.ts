// @lib: es5
// @target: es5, es2015

interface Promise<T> {}
interface Symbol {}
interface Map<K, V> {}
interface WeakMap<K extends object, V> {}
interface Set<T> {}
interface WeakSet<T extends object> {}

(function() {
    new Promise;
    new Symbol; Symbol();
    new Map;
    new WeakMap;
    new Set;
    new WeakSet;
});
