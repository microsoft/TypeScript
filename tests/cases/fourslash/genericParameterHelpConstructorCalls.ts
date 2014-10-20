/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////class testClass<T extends IFoo, U, M extends IFoo> {
////    constructor(a:T, b:U, c:M){ }
////}
////
////// Constructor calls
////new testClass</*construcor1*/
////new testClass<IFoo, /*construcor2*/
////new testClass</*construcor3*/>(null, null, null)
////new testClass<,,/*construcor4*/>(null, null, null)
////new testClass<IFoo,/*construcor5*/IFoo,IFoo>(null, null, null)

 // goTo.marker("construcor1");
 // verify.currentSignatureHelpIs("testClass<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): testClass<T, U, M>");
 // verify.currentParameterHelpArgumentNameIs("T");
 // verify.currentParameterSpanIs("T extends IFoo");

 // goTo.marker("construcor2");
 // verify.currentParameterHelpArgumentNameIs("U");
 // verify.currentParameterSpanIs("U");

goTo.marker("construcor3");
verify.currentParameterHelpArgumentNameIs("T");
verify.currentParameterSpanIs("T extends IFoo");

goTo.marker("construcor4");
verify.currentParameterHelpArgumentNameIs("M");
verify.currentParameterSpanIs("M extends IFoo");

goTo.marker("construcor5");
verify.currentParameterHelpArgumentNameIs("U");
verify.currentParameterSpanIs("U");
