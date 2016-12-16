///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////**
//// * Do some foo things
//// * @template T A Foolish template
//// * @param {T} x a parameter
//// */
////function foo(x) {
////}
////
////fo/**/o()

goTo.marker();
verify.quickInfoIs("function foo<T>(x: T): void", "Do some foo things");
