//// [constEnumSyntheticNodesComments.ts]
const enum En { A, B, C, D }

function assert<T>(x: T) {
    return x;
}

function verify(a: En) {
    switch (a) {
        case En.A:
            return assert<0>(a);
        case En["B"]:
            return assert<1>(a);
        case En[`C`]:
            return assert<2>(a);
        case En["\u{44}"]:
            return assert<3>(a);
    }
}

//// [constEnumSyntheticNodesComments.js]
function assert(x) {
    return x;
}
function verify(a) {
    switch (a) {
        case 0 /* A */:
            return assert(a);
        case 1 /* "B" */:
            return assert(a);
        case 2 /* `C` */:
            return assert(a);
        case 3 /* "\u{44}" */:
            return assert(a);
    }
}
