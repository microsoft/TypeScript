/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

////class Foo {
////	protected static readonly p = '';
////}
////
////export class Bar extends Foo {
////	[|protected static readonly p = ''|];
////}

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "protected static override readonly p = ''",
    index: 0
})
