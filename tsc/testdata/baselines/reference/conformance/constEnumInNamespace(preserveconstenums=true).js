//// [tests/cases/conformance/constEnums/constEnumInNamespace.ts] ////

//// [constEnumInNamespace.ts]
namespace N {
  export const enum E { A = 0 }
}


//// [constEnumInNamespace.js]
var N;
(function (N) {
    let E;
    (function (E) {
        E[E["A"] = 0] = "A";
    })(E = N.E || (N.E = {}));
})(N || (N = {}));
