/// <reference path='fourslash.ts'/>

////module ATest {
////    export interface Bar { }
////}
////
////function ATest() { }
////
////import [|alias|] = ATest; // definition
////
////var a: [|alias|].Bar; // namespace
////[|alias|].call(this); // value

verify.rangesReferenceEachOther();
