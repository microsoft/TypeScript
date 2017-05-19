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

verify.singleReferenceGroup("import alias = ATest");
