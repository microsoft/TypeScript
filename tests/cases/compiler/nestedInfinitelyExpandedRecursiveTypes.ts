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