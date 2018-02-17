//// [enumInitializers_const_circular.ts]
const x = E.y;
const enum E {
    y = x,
}

namespace N {
    export const a = F.a;
}
const enum F {
    a = N.a,
}


//// [enumInitializers_const_circular.js]
var x = E.y;
var N;
(function (N) {
    N.a = F.a;
})(N || (N = {}));
