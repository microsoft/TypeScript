/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
//// /*export1*/expo/*export2*/rt/*export3*/ class A {
//// 
////     /*private*/private z: string;
//// 
////     /*readonly*/readonly x: string;
//// 
////     /*async*/async a() {  }
//// 
////     /*override*/override b() {}
//// 
////     /*public1*/public/*public2*/ as/*multipleModifiers*/ync c() { }
//// }
////
//// exp/**/ort function foo() { }

verify.baselineGoToDefinition(
    "export1",
    "export2",
    "export3",
    "private",
    "readonly",
    "async",
    "override",
    "public1",
    "public2",
    "multipleModifiers"
);
