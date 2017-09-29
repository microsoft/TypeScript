//// [enumInitializers_const.ts]
const stride = 5;
const enum E {
    x = stride * 2,
}
E.x;

const s = "abc";
const enum S {
    abc = s,
}
S.abc;


//// [enumInitializers_const.js]
var stride = 5;
10 /* x */;
var s = "abc";
"abc" /* abc */;
