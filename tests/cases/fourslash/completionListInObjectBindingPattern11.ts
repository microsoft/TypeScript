/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////var { property1: prop1, /**/ }: I;

verify.completions({ marker: "", exact: "property2" });
