/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [| import /* 1 */ A /* 2 */, /* 3 */ { x } from './a'; |]
//// console.log(A);

// @Filename: file1.ts
//// export default 10;
//// export var x = 10;

verify.rangeAfterCodeFix("import /* 1 */ A /* 2 */ from './a';");