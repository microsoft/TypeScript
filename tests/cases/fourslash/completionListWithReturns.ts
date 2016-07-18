///<reference path="fourslash.ts" />
//// @allowJs: true
//// @filename: returnstagFourslash.js
/////**
//// * Find an item
//// * @returns {string|Array<string>}  The names of the found item(s).
//// */
////function find(targetName) {
////}
////
/////**
//// * @returns {!string} The name, if defined.
//// */
////function getName() {
////}
////
/////**
//// * @return The binding id.
//// */
////function bind(callback) {
////}
////
/////**
//// * @return An object to be passed to {@link find}.
//// */
////function convert(name) {
////}
////find/*1*/(''/*2*/);
////getName(/*4*/);
////bind(/*6*/() => { });
////convert(/*8*/'');


goTo.marker('2');
verify.currentSignatureHelpIs('find(targetName: any): string | string[]')
goTo.marker('1');
verify.quickInfoIs('Find an item!!');
// TODO: Verify doc text as well
