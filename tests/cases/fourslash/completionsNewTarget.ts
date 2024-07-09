/// <reference path='fourslash.ts' />

////class C {
////    constructor() {
////        if (C === new./*1*/)
////    }
////}
////class D {
////    constructor() {
////        if (D === new.target./*2*/)
////    }
////}

verify.completions({ marker: "1", exact: "target" });
verify.completions({ marker: "2", excludes: ["target"] });
