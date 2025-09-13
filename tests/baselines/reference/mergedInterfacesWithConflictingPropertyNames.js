//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithConflictingPropertyNames.ts] ////

//// [mergedInterfacesWithConflictingPropertyNames.ts]
interface A {
    x: string; // error
}

interface A {
    x: number;
}

namespace M {
    interface A<T> {
        x: T;
    }

    interface A<T> {
        x: number;  // error
    }
}

namespace M2 {
    interface A<T> {
        x: T;
    }   
}

namespace M2 {
    interface A<T> {
        x: number;  // ok, different declaration space than other M2
    }
}

namespace M3 {
    export interface A<T> {
        x: T;
    }
}

namespace M3 {
    export interface A<T> {
        x: number;  // error
    }
}

//// [mergedInterfacesWithConflictingPropertyNames.js]
