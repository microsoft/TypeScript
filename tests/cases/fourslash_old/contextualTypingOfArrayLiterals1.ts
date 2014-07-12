/// <reference path='fourslash.ts'/>

////class C {
////    name: string;
////    age: number;
////}

////interface I {
////    [x: number]: C;
////}

////var x/*1*/ = [null, null];
////var x2: I = [null, null];
////var r/*2*/ = x2[0];

////var a = { name: 'bob', age: 20 };
////var b = { name: 'jim', age: 20, dob: new Date() };
////var c: C;
////var d = { name: 'jim', age: 20, address: 'springfield' };

////var x3: I = [a, b];
////var r3/*3*/ = x3[1];

////var x4: I = [a, b, c];
////var r4/*4*/ = x4[1];

////var x5/*5*/ = [a, b, c, d];
////var r5/*6*/ = x5[1];

// the above code should have a couple errors that will need to be updated with appropriate new (non-error) code and quick info checks
verify.not.errorExistsBetweenMarkers('1', '6');

goTo.marker('1');
verify.quickInfoIs('any[]');

goTo.marker('2');
verify.quickInfoIs('C');

goTo.marker('3');
verify.quickInfoIs('C');

goTo.marker('4');
verify.quickInfoIs('C');

goTo.marker('5');
verify.quickInfoIs('{ name: string; age: number; }[]');

goTo.marker('6');
verify.quickInfoIs('{ name: string; age: number; }');