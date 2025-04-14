//// [tests/cases/conformance/interfaces/declarationMerging/twoGenericInterfacesDifferingByTypeParameterName2.ts] ////

//// [twoGenericInterfacesDifferingByTypeParameterName2.ts]
// type parameter names are relevant when choosing whether to merge interface declarations

interface B<T, U> {
    x: U;
}

interface B<U, T> { // error
    y: V;
}

module M {
    interface B<T, U> {
        x: U;
    }

    interface B<U, T> { // error
        y: T;
    }
}

module M2 {
    interface B<T, U> {
        x: U;
    }
}

module M2 {
    interface B<U, T> { // ok, different declaration space than other M2
        y: T;
    }
}

module M3 {
    export interface B<T, U> {
        x: U;
    }
}

module M3 {
    export interface B<U, T> { // error
        y: T;
    }
}



//// [twoGenericInterfacesDifferingByTypeParameterName2.js]
// type parameter names are relevant when choosing whether to merge interface declarations
