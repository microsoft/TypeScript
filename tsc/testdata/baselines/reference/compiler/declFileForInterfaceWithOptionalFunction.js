//// [tests/cases/compiler/declFileForInterfaceWithOptionalFunction.ts] ////

//// [declFileForInterfaceWithOptionalFunction.ts]
interface I {
    foo? (x?);
    foo2? (x?: number): number;
}

//// [declFileForInterfaceWithOptionalFunction.js]
"use strict";


//// [declFileForInterfaceWithOptionalFunction.d.ts]
interface I {
    foo?(x?: any): any;
    foo2?(x?: number): number;
}
