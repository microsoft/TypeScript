///<reference path="fourslash.ts" />

// Assignments to 'this' in the constructorish body create
// properties with those names

// @allowNonTsExtensions: true
// @Filename: myMod.js
//// function myCtor(x) {
////     this.qua = 10;
//// }
//// myCtor.prototype.foo = function() { return 32 };
//// myCtor.prototype.bar = function() { return '' };
////
//// var m = new myCtor(10);
//// m/*1*/
//// var x = m.qua;
//// x/*2*/
//// myCtor/*3*/

// Verify the instance property exists
goTo.marker('1');
edit.insert('.');
verify.completions({ includes: { name: "qua", kind: "property" } });
edit.backspace();

// Verify the type of the instance property
goTo.marker('2');
edit.insert('.');
verify.completions({ includes: { name: "toFixed", kind: "method" } });

goTo.marker('3');
edit.insert('.');
// Make sure symbols don't leak out into the constructor
verify.completions({ includes: ["qua", "foo", "bar"].map(name => ({ name, kind: "warning" })) });
