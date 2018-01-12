/// <reference path='fourslash.ts' />

// @Filename: quickInfoExportAssignmentOfGenericInterface_0.ts
////interface I {
////    /** Documentation */
////    x: number;
////}
////const i: I = { /**/x: 0 };

verify.quickInfoAt("", "(property) I.x: number", "Documentation ");
