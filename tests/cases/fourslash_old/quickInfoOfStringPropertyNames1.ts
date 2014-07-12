/// <reference path='fourslash.ts'/>

////interface foo {
////    "foo bar": string;
////}

////var f: foo;
////var r/*1*/ = f['foo bar'];

////class bar {
////    'hello world': number;
////    '1': string;
////    constructor() {
////        bar['hello world'] = 3;
////    }
////}

////var b: bar;
////var r2/*2*/ = b["hello world"];
////var r4/*3*/ = b['1'];
////var r5/*4*/ = b[1];

goTo.marker('1');
verify.quickInfoIs('string');

goTo.marker('2');
verify.quickInfoIs('number');

goTo.marker('3');
verify.quickInfoIs('string');

goTo.marker('4');
verify.quickInfoIs('string');
