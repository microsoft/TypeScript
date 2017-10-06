//// [enumInitializers_const.ts]
const stride = 5;
namespace N {
    export const two = 2;
}
const enum E {
    x = stride * N.two,
}
E.x;

const s = "abc";
const enum S {
    abc = s,
}
S.abc;


//// [enumInitializers_const.js]
var stride = 5;
var N;
(function (N) {
    N.two = 2;
})(N || (N = {}));
10 /* x */;
var s = "abc";
"abc" /* abc */;
