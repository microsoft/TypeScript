/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////function testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M {
////    return null;
////}
////
////// Function calls
////testFunction</*1*/
////testFunction<any, /*2*/
////testFunction<any, any, any>(/*3*/
////testFunction<any, any,/*4*/ any>(null, null, null);
////testFunction<, ,/*5*/>(null, null, null);

// goTo.marker("1");
//  verify.currentSignatureParameterCountIs(3);
//  verify.currentSignatureHelpIs("testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M");

//  verify.currentParameterHelpArgumentNameIs("T");
//  verify.currentParameterSpanIs("T extends IFoo");

//  goTo.marker("2");
//  verify.currentParameterHelpArgumentNameIs("U");
//  verify.currentParameterSpanIs("U");

goTo.marker("3");
verify.currentParameterHelpArgumentNameIs("a");
verify.currentParameterSpanIs("a: any");

goTo.marker("4");
verify.currentParameterHelpArgumentNameIs("M");
verify.currentParameterSpanIs("M extends IFoo");

goTo.marker("5");
verify.currentParameterHelpArgumentNameIs("M");
verify.currentParameterSpanIs("M extends IFoo");