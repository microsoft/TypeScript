//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithConflictingPropertyNames2.ts] ////

//// [mergedInterfacesWithConflictingPropertyNames2.ts]
interface A {
    x: string; // error
}

interface A {
    x: string; // error
}

module M {
    interface A<T> {
        x: T;
    }

    interface A<T> {
        x: T;  // error
    }
}

module M2 {
    interface A<T> {
        x: T;
    }   
}

module M2 {
    interface A<T> {
        x: T;  // ok, different declaration space than other M2
    }
}

module M3 {
    export interface A<T> {
        x: T;
    }
}

module M3 {
    export interface A<T> {
        x: T;  // error
    }
}

//// [mergedInterfacesWithConflictingPropertyNames2.js]
