//// [tests/cases/compiler/declFileForInterfaceWithOptionalFunction.ts] ////

//// [declFileForInterfaceWithOptionalFunction.ts]
interface I {
    foo? (x?);
    foo2? (x?: number): number;
}

//// [declFileForInterfaceWithOptionalFunction.js]
