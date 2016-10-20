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
//// var p;p./*person*/;
//// p.personName./*personName*/;
//// p.personAge./*personAge*/;
////
//// /** @type {Animal} */
//// var a;a./*animal*/;
//// a.animalName./*animalName*/;
//// a.animalAge./*animalAge*/;
////
//// /** @type {Cat} */
//// var c;c./*cat*/;
//// c.catName./*catName*/;
//// c.catAge./*catAge*/;
////
//// /** @type {Dog} */
//// var d;d./*dog*/;
//// d.dogName./*dogName*/;
//// d.dogAge./*dogAge*/;

goTo.marker('numberLike');
verify.memberListContains('charAt');
verify.memberListContains('toExponential');

goTo.marker('person');
verify.memberListContains('personName');
verify.memberListContains('personAge');
goTo.marker('personName');
verify.memberListContains('charAt');
goTo.marker('personAge');
verify.memberListContains('toExponential');

goTo.marker('animal');
verify.memberListContains('animalName');
verify.memberListContains('animalAge');
goTo.marker('animalName');
verify.memberListContains('charAt');
goTo.marker('animalAge');
verify.memberListContains('toExponential');

goTo.marker('dog');
verify.memberListContains('dogName');
verify.memberListContains('dogAge');
goTo.marker('dogName');
verify.memberListContains('charAt');
goTo.marker('dogAge');
verify.memberListContains('toExponential');

goTo.marker('cat');
verify.memberListContains('catName');
verify.memberListContains('catAge');
goTo.marker('catName');
verify.memberListContains('charAt');
goTo.marker('catAge');
verify.memberListContains('toExponential');