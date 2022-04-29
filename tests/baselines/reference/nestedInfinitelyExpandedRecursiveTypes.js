//// [nestedInfinitelyExpandedRecursiveTypes.ts]
interface F<T> {
      t: G<F<() => T>>;
}
interface G<U> {
      t: G<G<() => U>>;
}
 
var f: F<string>;
var g: G<string>;
f = g;
g = f;

//// [nestedInfinitelyExpandedRecursiveTypes.js]
var f;
var g;
f = g;
g = f;
