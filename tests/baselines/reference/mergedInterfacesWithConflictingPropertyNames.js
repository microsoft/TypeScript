//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithConflictingPropertyNames.ts] ////

//// [mergedInterfacesWithConflictingPropertyNames.ts]
interface A {
    x: string; // error
}

interface A {
    x: number;
}

module M {
    interface A<T> {
        x: T;
    }

    interface A<T> {
        x: number;  // error
    }
}

module M2 {
    interface A<T> {
        x: T;
    }   
}

module M2 {
    interface A<T> {
        x: number;  // ok, different declaration space than other M2
    }
}

module M3 {
    export interface A<T> {
        x: T;
    }
}

module M3 {
    export interface A<T> {
        x: number;  // error
    }
}

//// [mergedInterfacesWithConflictingPropertyNames.js]
