/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////class testClass<T extends IFoo, U, M extends IFoo> {
////    constructor(a:T, b:U, c:M){ }
////}
////
////// Constructor calls
////new testClass</*constructor1*/
////new testClass<IFoo, /*constructor2*/
////new testClass</*constructor3*/>(null, null, null)
////new testClass<,,/*constructor4*/>(null, null, null)
////new testClass<IFoo,/*constructor5*/IFoo,IFoo>(null, null, null)

 // goTo.marker("constructor1");
 // verify.currentSignatureHelpIs("testClass<T extends IFoo, U, M extends IFoo>(a: T, b: U, c: M): testClass<T, U, M>");
 // verify.currentParameterHelpArgumentNameIs("T");
 // verify.currentParameterSpanIs("T extends IFoo");

 // goTo.marker("constructor2");
 // verify.currentParameterHelpArgumentNameIs("U");
 // verify.currentParameterSpanIs("U");

goTo.marker("constructor3");
verify.currentParameterHelpArgumentNameIs("T");
verify.currentParameterSpanIs("T extends IFoo");

goTo.marker("constructor4");
verify.currentParameterHelpArgumentNameIs("M");
verify.currentParameterSpanIs("M extends IFoo");

goTo.marker("constructor5");
verify.currentParameterHelpArgumentNameIs("U");
verify.currentParameterSpanIs("U");
