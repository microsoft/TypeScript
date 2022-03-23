//// [tests/cases/compiler/pathsAppliedToTypesReference.ts] ////

//// [index.d.ts]
export { };
declare global {
    const foo: number;
}

//// [index.ts]
/// <reference types="p1" />
foo;


//// [index.js]
/// <reference types="p1" />
foo;
