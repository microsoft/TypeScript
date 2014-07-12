/// <reference path='fourslash.ts'/>

////class C<T> {
////    map(fn: (k/*1*/: string, value/*2*/: T, context: any) => void, context: any) {
////    }
////}

////var c: C<number>;
////c.map(/*3*/

goTo.marker('1');
verify.quickInfoIs('string');

goTo.marker('2');
verify.quickInfoIs('T');

goTo.marker('3');
verify.currentSignatureHelpIs('map(fn: (k: string, value: number, context: any) => void, context: any): void');