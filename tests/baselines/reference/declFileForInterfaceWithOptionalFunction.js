//// [declFileForInterfaceWithOptionalFunction.ts]
interface I {
    foo? (x?);
    foo2? (x?: number): number;
}

//// [declFileForInterfaceWithOptionalFunction.js]


//// [declFileForInterfaceWithOptionalFunction.d.ts]
interface I {
    foo?(x?: any): any;
    foo2?(x?: number): number;
}
