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

verify.completions(
    { marker: "numberLike", includes: ["charAt", "toExponential"] },

    { marker: "person", includes: ["personName", "personAge"] },
    { marker: "personName", includes: "charAt" },
    { marker: "personAge", includes: "toExponential" },

    { marker: "animal", includes: ["animalName", "animalAge"] },
    { marker: "animalName", includes: "charAt" },
    { marker: "animalAge", includes: "toExponential" },

    { marker: "dog", includes: ["dogName", "dogAge"] },
    { marker: "dogName", includes: "charAt" },
    { marker: "dogAge", includes: "toExponential" },

    { marker: "cat", includes: ["catName", "catAge"] },
    { marker: "catName", includes: "charAt" },
    { marker: "catAge", includes: "toExponential" },
);

verify.quickInfoAt("AnimalType", "type Animal = {\n    animalName: string;\n    animalAge: number;\n}", "- think Giraffes");
