/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @Filename: file2.ts
//// [| import /* 1 */ A /* 2 */, /* 3 */ { /* 4 */ x /* 5 */ } /* 6 */ from './a'; |]
//// console.log(A);

// @Filename: file1.ts
//// export default 10;
//// export var x = 10;


// It's ambiguous which token comment /* 6 */ applies to or whether it should be removed.
// In the current implementation the comment is left behind, but this behavior isn't a requirement.
verify.rangeAfterCodeFix("import /* 1 */ A /* 2 */ /* 6 */ from './a';");