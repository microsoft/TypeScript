/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters: true

////export function f({ x, y }, a) {
////    a;
////}

verify.codeFix({
    description: [ts.Diagnostics.Remove_unused_declarations_for_Colon_0.message, "x, y"],
    index: 0,
    newFileContent:
`export function f({  }, a) {
    a;
}`,
});
