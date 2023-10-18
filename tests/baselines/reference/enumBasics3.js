//// [tests/cases/compiler/enumBasics3.ts] ////

//// [enumBasics3.ts]
module M {
  export namespace N {
    export enum E1 {
      a = 1,
      b = a.a, // should error
    }
  }
}

module M {
  export namespace N {
    export enum E2 {
      b = M.N.E1.a,
      c = M.N.E1.a.a, // should error
    }
  }
}


//// [enumBasics3.js]
var M;
(function (M) {
    var N;
    (function (N) {
        var E1;
        (function (E1) {
            E1[E1["a"] = 1] = "a";
            E1[E1["b"] = E1.a.a] = "b";
        })(E1 = N.E1 || (N.E1 = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
(function (M) {
    var N;
    (function (N) {
        var E2;
        (function (E2) {
            E2[E2["b"] = 1] = "b";
            E2[E2["c"] = M.N.E1.a.a] = "c";
        })(E2 = N.E2 || (N.E2 = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
