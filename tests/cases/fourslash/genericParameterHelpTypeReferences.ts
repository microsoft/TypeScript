/// <reference path="fourslash.ts"/>

////interface IFoo { }
////
////class testClass<T extends IFoo, U, M extends IFoo> {
////    constructor(a:T, b:U, c:M){ }
////}
////
////// Generic types
////testClass</*type1*/
////var x : testClass</*type2*/
////class Bar<T> extends testClass</*type3*/
////var x : testClass<,, /*type4*/any>;

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