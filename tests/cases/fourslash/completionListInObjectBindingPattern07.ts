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
////var { property1: { /**/ } } = foo;

verify.completions({ marker: "", exact: ["propertyOfI_1", "propertyOfI_2"] });
