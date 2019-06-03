/// <reference path='fourslash.ts'/>

////module ATest {
////    export interface Bar { }
////}
////
////function ATest() { }
////
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}alias|] = ATest;|] // definition
////
////var a: [|alias|].Bar; // namespace
////[|alias|].call(this); // value

verify.singleReferenceGroup([
    "(alias) function alias(): void",
    "(alias) namespace alias",
    "import alias = ATest"
].join("\n"), test.rangesByText().get("alias"));
