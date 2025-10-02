//// [tests/cases/compiler/accessorInAmbientContextES5.ts] ////

//// [accessorInAmbientContextES5.ts]
// Should allow accessor in ambient contexts even when targeting ES5

declare class AmbientClass {
    accessor prop1: string;
    static accessor prop2: number;
    private accessor prop3: boolean;
    private static accessor prop4: symbol;
}

declare namespace AmbientNamespace {
    class C {
        accessor prop: string;
    }
}

// Should also work in .d.ts files (simulated with declare)
declare module "some-module" {
    export class ExportedClass {
        accessor value: any;
    }
}

// Regular class should still error when targeting ES5
class RegularClass {
    accessor shouldError: string; // Should still error
}

//// [accessorInAmbientContextES5.js]
// Regular class should still error when targeting ES5
class RegularClass {
    accessor shouldError; // Should still error
}


//// [accessorInAmbientContextES5.d.ts]
declare class AmbientClass {
    accessor prop1: string;
    static accessor prop2: number;
    private accessor prop3;
    private static accessor prop4;
}
declare namespace AmbientNamespace {
    class C {
        accessor prop: string;
    }
}
declare module "some-module" {
    class ExportedClass {
        accessor value: any;
    }
}
declare class RegularClass {
    accessor shouldError: string;
}
