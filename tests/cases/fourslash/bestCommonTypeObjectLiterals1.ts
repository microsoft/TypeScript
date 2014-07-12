/// <reference path='fourslash.ts'/>

////var a = { name: 'bob', age: 18 };
////var b = { name: 'jim', age: 20 };
////var c/*1*/ = [a, b];

////var a1 = { name: 'bob', age: 18 };
////var b1 = { name: 'jim', age: 20, dob: new Date() };
////var c1/*2*/ = [a1, b1];

////var a2 = { name: 'bob', age: 18, address: 'springfield' };
////var b2 = { name: 'jim', age: 20, dob: new Date() };
////var c2/*3*/ = [a2, b2];
////var c2a/*4*/ = [a2, b2, a1];

////interface I {
////    name: string;
////    age: number;
////}

////var i: I;
////var c3/*5*/ = [a2, b2, i];

goTo.marker('1');
verify.quickInfoIs('{ name: string; age: number; }[]');

goTo.marker('2');
verify.quickInfoIs('{ name: string; age: number; }[]');

goTo.marker('3');
verify.quickInfoIs('{}[]');

goTo.marker('4');
verify.quickInfoIs('{ name: string; age: number; }[]');

goTo.marker('5');
verify.quickInfoIs('I[]');