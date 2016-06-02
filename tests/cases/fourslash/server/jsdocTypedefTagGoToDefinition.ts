/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js

//// /**
////  * @typedef {Object} Person
////  * /*1*/@property {string} personName
////  * @property {number} personAge
////  */
////
//// /**
////  * @typedef {{ /*2*/animalName: string, animalAge: number }} Animal
////  */
////
//// /** @type {Person} */
//// var person; person.personName/*3*/
////
//// /** @type {Animal} */
//// var animal; animal.animalName/*4*/

goTo.file('jsdocCompletion_typedef.js');
goTo.marker('3');
goTo.definition();
verify.caretAtMarker('1');

goTo.marker('4');
goTo.definition();
verify.caretAtMarker('2');
