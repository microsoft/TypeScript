/// <reference path='fourslash.ts' />

////var a: Array<string> | Array<number>;
////a./*1*/length

goTo.marker('1');
verify.quickInfoIs("(property) length: number", "Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.");