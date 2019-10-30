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