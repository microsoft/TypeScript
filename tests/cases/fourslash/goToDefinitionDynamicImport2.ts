/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function /*Destination*/bar() { return "bar"; }

//// var x = import("./foo");
//// x.then(foo => {
////     foo.[|b/*1*/ar|](); 
//// })

verify.baselineGoToDefinition("1");
