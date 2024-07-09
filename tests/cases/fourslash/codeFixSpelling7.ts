/// <reference path='fourslash.ts' />

////namespace Foo {
////    export type nums = number;
////}
////let x: Foo.[|num|];

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Change_spelling_to_0.message, "nums"],
    newRangeContent: "nums"
});
