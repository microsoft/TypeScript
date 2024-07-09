/// <reference path='fourslash.ts' />

// @filename: a.ts
////module Foo {
////    export type nums = number;
////}
// @filename: b.ts
////let x: Foo.[|num|];

goTo.file("b.ts");
verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Change_spelling_to_0.message, "nums"],
    newRangeContent: "nums"
});
