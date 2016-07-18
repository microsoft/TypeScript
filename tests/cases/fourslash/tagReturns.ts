// @allowJs: true
// @Filename: in.js
// @out: out.js
///<reference path="fourslash.ts" />
/////**
//// * Find an item or item(s)
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
/////** Here? {@link bind} + x * y
//// * @return An object to be passed to {@link find}.
//// */
////function convert(name) {
////}
////find/*1*/('');
////getName/*2*/();
////bind/*3*/(() => { });
////convert/*4*/('');


goTo.marker('1');
verify.quickInfoIs('function find(targetName: any): string | string[]', 'Find an item or item(s)');
goTo.marker('2');
verify.quickInfoIs('function getName(): string', '');
goTo.marker('3');
verify.quickInfoIs('function bind(callback: any): void', '');
goTo.marker('4');
verify.quickInfoIs('function convert(name: any): void', 'Here? {@link bind} + x * y');
// TODO: Not sure how to verify the @returns text
