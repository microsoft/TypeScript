/// <reference path='fourslash.ts' />


////class C {
////    [foo: /*1*/
////}

verify.completions({ marker: "1", includes: "C", excludes: "foo" });
edit.insert("typeof ");
verify.completions({ includes: ["C", "foo"] });
