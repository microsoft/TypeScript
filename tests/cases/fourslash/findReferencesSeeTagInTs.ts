/// <reference path='fourslash.ts' />

//// function doStuffWithStuff/*1*/(stuff: { quantity: number }) {}
////
//// declare const stuff: { quantity: number };
//// /** @see {doStuffWithStuff} */
//// if (stuff.quantity) {}

verify.baselineFindAllReferences("1");
