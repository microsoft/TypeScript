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
