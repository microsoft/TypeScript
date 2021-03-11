///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js

/////**
//// * Does some stuff.
//// *     Second line.
//// * 	Third line.
//// */
////function foo/**/(){}

goTo.marker();
verify.quickInfoIs("function foo(): void", "Does some stuff.\n    Second line.\n\tThird line.");
