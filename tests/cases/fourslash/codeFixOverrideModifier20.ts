/// <reference path='fourslash.ts' />

// @noImplicitOverride: true

////class Foo {
////	static readonly p = '';
////}
////
////export class Bar extends Foo {
////	[|static readonly p = ''|];
////}

verify.codeFix({
    description: "Add 'override' modifier",
    newRangeContent: "static override readonly p = ''",
    index: 0
})
