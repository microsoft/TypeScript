/// <reference path='fourslash.ts'/>

////class C<T> {
////    map(fn: (/*1*/k: string, /*2*/value: T, context: any) => void, context: any) {
////    }
////}

////var c: C<number>;
////c.map(/*3*/

goTo.marker('1');
verify.quickInfoIs('(parameter) k: string');

goTo.marker('2');
verify.quickInfoIs('(parameter) value: T');

goTo.marker('3');
verify.currentSignatureHelpIs('map(fn: (k: string, value: number, context: any) => void, context: any): void');