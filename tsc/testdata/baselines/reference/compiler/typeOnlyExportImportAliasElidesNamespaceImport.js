//// [tests/cases/compiler/typeOnlyExportImportAliasElidesNamespaceImport.ts] ////

//// [a.ts]
export interface A {
    a: number;
}

//// [b.ts]
import * as ns from "./a";

export import A = ns.A;


//// [a.js]
export {};
//// [b.js]
export {};
