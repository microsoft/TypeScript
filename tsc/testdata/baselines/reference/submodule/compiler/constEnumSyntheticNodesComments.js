//// [tests/cases/compiler/constEnumSyntheticNodesComments.ts] ////

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
var En;
(function (En) {
    En[En["A"] = 0] = "A";
    En[En["B"] = 1] = "B";
    En[En["C"] = 2] = "C";
    En[En["D"] = 3] = "D";
})(En || (En = {}));
function assert(x) {
    return x;
}
function verify(a) {
    switch (a) {
        case En.A:
            return assert(a);
        case En["B"]:
            return assert(a);
        case En[`C`]:
            return assert(a);
        case En["\u{44}"]:
            return assert(a);
    }
}
