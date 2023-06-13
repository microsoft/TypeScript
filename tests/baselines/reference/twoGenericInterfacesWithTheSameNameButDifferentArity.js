//// [tests/cases/conformance/interfaces/declarationMerging/twoGenericInterfacesWithTheSameNameButDifferentArity.ts] ////

//// [twoGenericInterfacesWithTheSameNameButDifferentArity.ts]
interface A<T> {
    x: T;
}

interface A<T, U> { // error
    y: T;
}

module M {
    interface A<T> {
        x: T;
    }

    interface A<T, U> { // error
        y: T;
    }
}

module M2 {
    interface A<T> {
        x: T;
    }
}

module M2 {
    interface A<T, U> { // ok, different declaration space than other M2
        y: T;
    }
}

module M3 {
    export interface A<T> {
        x: T;
    }
}

module M3 {
    export interface A<T, U> { // error
        y: T;
    }
}

//// [twoGenericInterfacesWithTheSameNameButDifferentArity.js]
