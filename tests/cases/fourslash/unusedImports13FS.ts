/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [| import A, { x } from './a'; |]
//// console.log(A);

// @Filename: file1.ts
//// export default 10;
//// export var x = 10;

verify.rangeAfterCodeFix("import A from './a';");