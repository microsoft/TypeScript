///<reference path="fourslash.ts"/>
// https://github.com/microsoft/TypeScript/issues/14589

/////*1*/if (<number>foo < <number>bar) {}

format.document();
goTo.marker("1")
verify.currentLineContentIs(`if (<number>foo < <number>bar) { }`)
