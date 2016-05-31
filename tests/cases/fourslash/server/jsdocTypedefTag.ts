/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js

//// /** @typedef {(string | number)} NumberLike */
////
//// /**
////  * @typedef Animal
////  * @type {Object}
////  * @property {string} animalName
////  * @property {number} animalAge
////  */
////
//// /**
////  * @typedef {Object} Person
////  * @property {string} personName
////  * @property {number} personAge
////  */
////
//// /**
////  * @typedef {Object}
////  * @property {string} catName
////  * @property {number} catAge
////  */
//// var Cat;
////
//// /** @typedef {{ dogName: string, dogAge: number }} */
//// var Dog;
////
//// /** @type {NumberLike} */
//// var numberLike; numberLike./*numberLike*/
////
//// /** @type {Person} */
//// var p;p./*person*/
////
//// /** @type {Animal} */
//// var a;a./*animal*/
////
//// /** @type {Cat} */
//// var c;c./*cat*/
////
//// /** @type {Dog} */
//// var d;d./*dog*/

goTo.marker('numberLike');
verify.memberListContains('charAt');
verify.memberListContains('toExponential');

goTo.marker('person');
verify.memberListContains('personName');
verify.memberListContains('personAge');

goTo.marker('animal');
verify.memberListContains('animalName');
verify.memberListContains('animalAge');

goTo.marker('dog');
verify.memberListContains('dogName');
verify.memberListContains('dogAge');

goTo.marker('cat');
verify.memberListContains('catName');
verify.memberListContains('catAge');