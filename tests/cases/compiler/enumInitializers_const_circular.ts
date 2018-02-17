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
