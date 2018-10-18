/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCompletion_typedef.js

//// /** @typedef {(string | number)} NumberLike */
////
//// /**
////  * @typedef Animal - think Giraffes
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
//// /** @type {/*AnimalType*/Animal} */
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
verify.completionListContains('charAt');
verify.completionListContains('toExponential');

goTo.marker('person');
verify.completionListContains('personName');
verify.completionListContains('personAge');
goTo.marker('personName');
verify.completionListContains('charAt');
goTo.marker('personAge');
verify.completionListContains('toExponential');

goTo.marker('animal');
verify.completionListContains('animalName');
verify.completionListContains('animalAge');
goTo.marker('animalName');
verify.completionListContains('charAt');
goTo.marker('animalAge');
verify.completionListContains('toExponential');

goTo.marker('dog');
verify.completionListContains('dogName');
verify.completionListContains('dogAge');
goTo.marker('dogName');
verify.completionListContains('charAt');
goTo.marker('dogAge');
verify.completionListContains('toExponential');

goTo.marker('cat');
verify.completionListContains('catName');
verify.completionListContains('catAge');
goTo.marker('catName');
verify.completionListContains('charAt');
goTo.marker('catAge');
verify.completionListContains('toExponential');

goTo.marker("AnimalType");
verify.quickInfoIs("type Animal = {\n    animalName: string;\n    animalAge: number;\n}", "- think Giraffes");
