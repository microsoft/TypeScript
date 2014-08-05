/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////function testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M {
////    return null;
////}
////
////class testClass<T extends IFoo, U, M extends IFoo> {
////    constructor(a:T, b:U, c:M){ }
////}
////// Function calls
////testFunction</*1*/
////testFunction<any, /*2*/
////testFunction<any, any, any>(/*3*/
////testFunction<any, any,/*4*/ any>(null, null, null);
////testFunction<, ,/*5*/>(null, null, null);
////// Constructor calls
////new testClass</*construcor1*/
////new testClass<IFoo, /*construcor2*/
////new testClass</*construcor3*/>(null, null, null)
////new testClass<,,/*construcor4*/>(null, null, null)
////new testClass<IFoo,/*construcor5*/IFoo,IFoo>(null, null, null)
////// Generic types
////testClass</*type1*/
////var x : testClass</*type2*/
////class Bar<T> extends testClass</*type3*/
////var x : testClass<,, /*type4*/any>;

goTo.marker("1");
// verify.currentSignatureParamterCountIs(3);
// verify.currentSignatureHelpIs("testFunction<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): M");

// verify.currentParameterHelpArgumentNameIs("T");
// verify.currentParameterSpanIs("T extends IFoo");

// goTo.marker("2");
// verify.currentParameterHelpArgumentNameIs("U");
// verify.currentParameterSpanIs("U");

// goTo.marker("3");
// verify.currentParameterHelpArgumentNameIs("a");
// verify.currentParameterSpanIs("a: T");

// goTo.marker("4");
// verify.currentParameterHelpArgumentNameIs("M");
// verify.currentParameterSpanIs("M extends IFoo");

// goTo.marker("5");
// verify.currentParameterHelpArgumentNameIs("M");
// verify.currentParameterSpanIs("M extends IFoo");

// goTo.marker("construcor1");
// verify.currentSignatureHelpIs("testClass<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): testClass<T, U, M>");
// verify.currentParameterHelpArgumentNameIs("T");
// verify.currentParameterSpanIs("T extends IFoo");

// goTo.marker("construcor2");
// verify.currentParameterHelpArgumentNameIs("U");
// verify.currentParameterSpanIs("U");

// goTo.marker("construcor3");
// verify.currentParameterHelpArgumentNameIs("T");
// verify.currentParameterSpanIs("T extends IFoo");

// goTo.marker("construcor4");
// verify.currentParameterHelpArgumentNameIs("M");
// verify.currentParameterSpanIs("M extends IFoo");

// goTo.marker("construcor5");
// verify.currentParameterHelpArgumentNameIs("U");
// verify.currentParameterSpanIs("U");

// goTo.marker("type1");
// verify.signatureHelpCountIs(1);
// verify.currentSignatureHelpIs("testClass<T extends IFoo, U, M extends IFoo>");
// verify.currentParameterHelpArgumentNameIs("T");
// verify.currentParameterSpanIs("T extends IFoo");

// goTo.marker("type2");
// verify.signatureHelpCountIs(1);
// verify.currentParameterHelpArgumentNameIs("T");
// verify.currentParameterSpanIs("T extends IFoo");

// goTo.marker("type3");
// verify.signatureHelpCountIs(1);
// verify.currentParameterHelpArgumentNameIs("T");
// verify.currentParameterSpanIs("T extends IFoo");

// goTo.marker("type4");
// verify.signatureHelpCountIs(1);
// verify.currentParameterHelpArgumentNameIs("M");
// verify.currentParameterSpanIs("M extends IFoo");