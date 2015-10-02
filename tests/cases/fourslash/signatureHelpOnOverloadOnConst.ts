/// <reference path='fourslash.ts'/>

////function x1(x: 'hi');
////function x1(y: 'bye');
////function x1(z: string);
////function x1(a: any) {
////}
////
////x1(''/*1*/);
////x1('hi'/*2*/);
////x1('bye'/*3*/);

goTo.marker('1');
verify.signatureHelpCountIs(3);
verify.currentParameterHelpArgumentNameIs("z");
verify.currentParameterSpanIs("z: string");

goTo.marker('2');
verify.signatureHelpCountIs(3);
verify.currentParameterHelpArgumentNameIs("x");
verify.currentParameterSpanIs("x: \"hi\"");

goTo.marker('3');
verify.signatureHelpCountIs(3);
verify.currentParameterHelpArgumentNameIs("y");
verify.currentParameterSpanIs("y: \"bye\"");
