///<reference path="fourslash.ts" />

// Classes have their shape inferred from assignments
// to properties of 'this' in the constructor

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// class Foo {
////    constructor() {
////        /**
////          * @type {string}
////        */
////        this.baz = null;
////    }
//// }
//// var x = new Foo();
//// x/**/

goTo.marker();
edit.insert('.baz.');
verify.completions({ includes: { name: "substring", kind: "method", kindModifiers: "declare" } });
