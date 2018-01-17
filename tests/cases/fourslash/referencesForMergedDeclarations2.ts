/// <reference path='fourslash.ts'/>

////module ATest {
////    export interface Bar { }
////}
////
////function ATest() { }
////
////import [|{| "isWriteAccess": true, "isDefinition": true |}alias|] = ATest; // definition
////
////var a: [|alias|].Bar; // namespace
////[|alias|].call(this); // value

verify.singleReferenceGroup([
    "(alias) namespace alias",
    "(alias) function alias(): void",
    "import alias = ATest"
].join("\n"));
