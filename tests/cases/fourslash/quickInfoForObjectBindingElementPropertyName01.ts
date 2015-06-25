/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////var foo: I;
////var { /**/property1: prop1 } = foo;

goTo.marker();
verify.quickInfoIs("(property) I.property1: number");