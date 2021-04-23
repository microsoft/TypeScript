/// <reference path="fourslash.ts" />

// @checkJs: true
// @allowJs: true

// @Filename: index.js
//// module.exports = {
////   a/*1*/
//// }
//// 
//// exports.foo = {
////   a/*2*/
//// }
//// 
//// function F() {
////   this.blah = {
////       a/*3*/
////   };
//// }
//// 
//// F.foo = {
////   a/*4*/
//// }
//// 
//// F.prototype = {
////   a/*5*/
//// }
//// 
//// F.prototype.x = {
////   a/*6*/
//// }

[1, 2, 3, 4, 5, 6].forEach(marker => {
  verify.completions({
    marker: `${marker}`,
    excludes: "a",
    isNewIdentifierLocation: true,
  });
});
