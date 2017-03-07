/// <reference path='fourslash.ts' />

// @moduleResolution: node

// @Filename: import.ts
//// import { A, Imported, ImportedAndRenamed as MyImportedAndRenamed } from "export";
//// class C extends A {[| |]}

// @Filename: node_modules/export.ts
//// export interface Imported { }
//// export interface ImportedAndRenamed { }
//// export interface NotImported { }
//// interface NotExported { }
//// export abstract class A { 
////     abstract x: Imported;
////     abstract y: ImportedAndRenamed;
////     abstract z: NotImported;
////     abstract w: NotExported;
//// }

verify.rangeAfterCodeFix(`
    x: Imported;
    y: MyImportedAndRenamed;
`);