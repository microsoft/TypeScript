///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: dummy.js

//// /**
////  * @typedef Product
////  * @property {string} title
////  * @property {boolean} h/*1*/igh-top some-comments
////  */
//// 
//// /**
////  * @type {Pro/*2*/duct}
////  */
//// const product = {
////     /*3*/
//// }
verify.quickInfoAt('1', '(property) high-top: boolean', 'some-comments');

verify.quickInfoAt('2', 'type Product = {\n    title: string;\n    high-top: boolean;\n}');

verify.completions({
  marker: ['3'],
  includes: ['"high-top"']
});
