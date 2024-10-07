module M1 {
    export function reduce<A>(ar, f, e?): Array<A> {
        return Array.prototype.reduce.apply(ar, e ? [f, e] : [f]);
    };
};
module M2 {
  import A = M1
  export function compose() {
        A.reduce(arguments, compose2);
    };
    export function compose2<B, C, D>(g: (x: B) => C, f: (x: D) => B): (x: D) => C {
    return function (x) { return g(f(x)); }
  };
};