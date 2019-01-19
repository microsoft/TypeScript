/// <reference path='fourslash.ts'/>

////interface I {
////    propertyOfI_1: number;
////    propertyOfI_2: string;
////}
////interface J {
////    property1: I;
////    property2: string;
////}
////
////var foo: J;
////var { property1: { propertyOfI_1, }, /**/ } = foo;

verify.completions({ marker: "", exact: ["property2"] });
