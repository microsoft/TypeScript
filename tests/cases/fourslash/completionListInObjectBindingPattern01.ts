/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////var foo: I;
////var { /**/ } = foo;

verify.completions({ marker: "", exact: ["property1", "property2"] });
