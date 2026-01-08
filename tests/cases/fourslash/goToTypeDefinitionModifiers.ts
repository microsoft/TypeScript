/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
//// /*export*/export class A/*A*/ {
//// 
////     /*private*/private z/*z*/: string;
////
////     /*private2*/private y/*y*/: A;
//// 
////     /*readonly*/readonly x/*x*/: string;
//// 
////     /*async*/async a/*a*/() {  }
//// 
////     /*override*/override b/*b*/() {}
//// 
////     /*public1*/public/*public2*/ as/*multipleModifiers*/ync c/*c*/() { }
//// }
////
//// exp/*exportFunction*/ort function foo/*foo*/() { }

verify.baselineGoToType(
    "export",
    "A",
    "private",
    "z",
    "private2",
    "y",
    "readonly",
    "x",
    "async",
    "a",
    "override",
    "b",
    "public1",
    "public2",
    "multipleModifiers",
    "c",
    "exportFunction",
    "foo"
);
