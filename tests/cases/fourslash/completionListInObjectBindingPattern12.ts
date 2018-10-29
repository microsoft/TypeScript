/// <reference path='fourslash.ts'/>

////interface I {
////    property1: number;
////    property2: string;
////}
////
////function f({ property1, /**/ }: I): void {
////}

verify.completions({ marker: "", includes: "property2", excludes: "property1" });
