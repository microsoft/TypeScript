/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// export function [|{| "isWriteAccess": true, "isDefinition": true |}bar|]() { return "bar"; }

//// var x = import("./foo");
//// x.then(foo => {
////     foo.[|bar|]();
//// })

verify.singleReferenceGroup("function bar(): string");
verify.rangesAreRenameLocations();
