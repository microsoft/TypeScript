/// <reference path="fourslash.ts"/>

////let i = 0;
/////*1*/(i++,i++);
/////*2*/(i++,++i);
/////*3*/(1,2);
/////*4*/(i++,2);
/////*5*/(i++,i++,++i,i--,2);

////let s = 'foo';
/////*6*/for (var i = 0,ii = 2; i < s.length; ii++,i++) {
////}

format.document();

goTo.marker("1");
verify.currentLineContentIs(`(i++, i++);`);

goTo.marker("2");
verify.currentLineContentIs(`(i++, ++i);`);

goTo.marker("3");
verify.currentLineContentIs(`(1, 2);`);

goTo.marker("4");
verify.currentLineContentIs(`(i++, 2);`);

goTo.marker("5");
verify.currentLineContentIs(`(i++, i++, ++i, i--, 2);`);

goTo.marker("6");
verify.currentLineContentIs(`for (var i = 0, ii = 2; i < s.length; ii++, i++) {`);
