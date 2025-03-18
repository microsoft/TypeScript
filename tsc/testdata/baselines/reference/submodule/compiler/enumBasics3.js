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
    let N;
    (function (N) {
        let E1;
        (function (E1) {
            E1[E1["a"] = 1] = "a";
            E1["b"] = E1.a.a;
            if (typeof E1.b !== "string") E1[E1.b] = "b";
        })(E1 = N.E1 || (N.E1 = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
(function (M) {
    let N;
    (function (N) {
        let E2;
        (function (E2) {
            E2["b"] = M.N.E1.a;
            if (typeof E2.b !== "string") E2[E2.b] = "b";
            E2["c"] = M.N.E1.a.a;
            if (typeof E2.c !== "string") E2[E2.c] = "c";
        })(E2 = N.E2 || (N.E2 = {}));
    })(N = M.N || (M.N = {}));
})(M || (M = {}));
