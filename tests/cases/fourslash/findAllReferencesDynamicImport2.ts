/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function [|bar|]() { return "bar"; }

//// var x = import("./foo");
//// x.then(foo => {
////     foo.[|bar|](); 
//// })

verify.rangesReferenceEachOther();
verify.rangesAreRenameLocations();