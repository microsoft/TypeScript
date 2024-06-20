/// <reference path='fourslash.ts'/>

// @strict: true
// @exactOptionalPropertyTypes: true
//// declare const xx: Record<string, number> & { a: 1 };
//// xx['a'/*1*/] = 1;
//// xx.a/*2*/ = 1;
//// xx['b'/*3*/] = 1;
//// xx.b/*4*/ = 1;

verify.quickInfoAt('1', '(property) a: 1');
verify.quickInfoAt('2', '(property) a: 1');
verify.quickInfoAt('3', 'number');
verify.quickInfoAt('4', 'number');
