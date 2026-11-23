//// [tests/cases/compiler/declarationEmitStripInternalTypeAliasRHS.ts] ////

//// [declarationEmitStripInternalTypeAliasRHS.ts]
interface Foo {}
export type T =
    /** @internal */
    Foo;


//// [declarationEmitStripInternalTypeAliasRHS.js]
export {};


//// [declarationEmitStripInternalTypeAliasRHS.d.ts]
export type T = any;
