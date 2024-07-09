//// [tests/cases/compiler/returnTypeParameterWithModules.ts] ////

//// [returnTypeParameterWithModules.ts]
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

//// [returnTypeParameterWithModules.js]
var M1;
(function (M1) {
    function reduce(ar, f, e) {
        return Array.prototype.reduce.apply(ar, e ? [f, e] : [f]);
    }
    M1.reduce = reduce;
    ;
})(M1 || (M1 = {}));
;
var M2;
(function (M2) {
    var A = M1;
    function compose() {
        A.reduce(arguments, compose2);
    }
    M2.compose = compose;
    ;
    function compose2(g, f) {
        return function (x) { return g(f(x)); };
    }
    M2.compose2 = compose2;
    ;
})(M2 || (M2 = {}));
;
