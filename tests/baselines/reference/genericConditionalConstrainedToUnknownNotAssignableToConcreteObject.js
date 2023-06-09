//// [tests/cases/compiler/genericConditionalConstrainedToUnknownNotAssignableToConcreteObject.ts] ////

//// [genericConditionalConstrainedToUnknownNotAssignableToConcreteObject.ts]
interface A { x: number }

declare function isA(a: unknown): a is A;

type FunctionsObj<T> = {
    [K in keyof T]: () => unknown
}

function g<
    T extends FunctionsObj<T>,
    M extends keyof T
>(a2: ReturnType<T[M]>, x: A) {
    x = a2;
}

// Original CFA report of the above issue

function g2<
    T extends FunctionsObj<T>,
    M extends keyof T
>(a2: ReturnType<T[M]>) {
    if (isA(a2)) {
        // a2 is not narrowed
        a2.x // error, but should be ok
    }
}


//// [genericConditionalConstrainedToUnknownNotAssignableToConcreteObject.js]
function g(a2, x) {
    x = a2;
}
// Original CFA report of the above issue
function g2(a2) {
    if (isA(a2)) {
        // a2 is not narrowed
        a2.x; // error, but should be ok
    }
}
