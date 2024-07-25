/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js

//// /**
////  * @typedef {Object} Person
////  * @property {string} /*1*/personName
////  * @property {number} personAge
////  */
////
//// /**
////  * @typedef {{ /*2*/animalName: string, animalAge: number }} Animal
////  */
////
//// /** @type {Person} */
//// var person; person.[|personName/*3*/|]
////
//// /** @type {Animal} */
//// var animal; animal.[|animalName/*4*/|]

verify.baselineGoToDefinition("3", "4");
