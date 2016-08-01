/// <reference path='fourslash.ts' />

// @Filename: test.ts
//// import * as foo0 from  "[|./some|]/*0*/
//// import foo1 = require( "[|./some|]/*1*/
//// var foo2 = require(    "[|./some|]/*2*/

//// import * as foo3 from  "[|./some|]/*3*/";
//// import foo4 = require( "[|./some|]/*4*/";
//// var foo5 = require(    "[|./some|]/*5*/";


// @Filename: someFile.ts
//// /*someFile*/

for (let i = 0; i < 6; i++) {
    goTo.marker("" + i);
    verify.importModuleCompletionListContains("someFile", i);
}