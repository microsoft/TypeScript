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
/////**
//// * @return An object to be passed to {@link find}.
//// */
////function convert(name) {
////}
////find/*1*/(''/*2*/);
////getName(/*4*/);
////bind(/*6*/() => { });
////convert(/*8*/'');


goTo.marker('1');
verify.quickInfoIs('function find(targetName: any): string | string[]', 'Find an item or item(s)');
// TODO: Not sure how to verify the @returns text
