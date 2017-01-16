///<reference path="fourslash.ts" />

// In an inferred class, we can rename successfully

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// class Foo {
////    constructor() {
////        this.[|union|] = 'foo';
////        this./*1*/[|union|] = 100;
////    }
////    method() { return this./*2*/[|union|]; }
//// }
//// var x = new Foo();
//// x./*3*/[|union|];

goTo.marker('1');
verify.renameLocations(/*findInStrings*/false, /*findInComments*/false);
goTo.marker('2');
verify.renameLocations(/*findInStrings*/false, /*findInComments*/false);
goTo.marker('3');
verify.renameLocations(/*findInStrings*/false, /*findInComments*/false);
