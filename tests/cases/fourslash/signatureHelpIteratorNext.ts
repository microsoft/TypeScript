/// <reference path='fourslash.ts' />
// @lib: esnext

//// declare const iterator: Iterator<string, void, number>;
////
//// iterator.next(/*1*/);
//// iterator.next(/*2*/ 0);
////
//// declare const generator: Generator<string, void, number>;
////
//// generator.next(/*3*/);
//// generator.next(/*4*/ 0);
////
//// declare const asyncIterator: AsyncIterator<string, void, number>;
////
//// asyncIterator.next(/*5*/);
//// asyncIterator.next(/*6*/ 0);
////
//// declare const asyncGenerator: AsyncGenerator<string, void, number>;
////
//// asyncGenerator.next(/*7*/);
//// asyncGenerator.next(/*8*/ 0);

verify.baselineSignatureHelp();
