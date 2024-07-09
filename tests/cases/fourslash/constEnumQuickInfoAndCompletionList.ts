/// <reference path='fourslash.ts' />

////const enum /*1*/e {
////    a,
////    b,
////    c
////}
/////*2*/e.a;

const text = "const enum e";
verify.completions({ marker: "2", includes: { name: "e", text } });
verify.quickInfos({ 1: text, 2: text });
