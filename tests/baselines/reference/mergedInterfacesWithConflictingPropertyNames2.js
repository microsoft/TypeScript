//// [tests/cases/conformance/interfaces/declarationMerging/mergedInterfacesWithConflictingPropertyNames2.ts] ////

//// [mergedInterfacesWithConflictingPropertyNames2.ts]
interface A {
    x: string; // error
}

interface A {
    x: string; // error
}

namespace M {
    interface A<T> {
        x: T;
    }

    interface A<T> {
        x: T;  // error
    }
}

namespace M2 {
    interface A<T> {
        x: T;
    }   
}

namespace M2 {
    interface A<T> {
        x: T;  // ok, different declaration space than other M2
    }
}

namespace M3 {
    export interface A<T> {
        x: T;
    }
}

namespace M3 {
    export interface A<T> {
        x: T;  // error
    }
}

//// [mergedInterfacesWithConflictingPropertyNames2.js]
