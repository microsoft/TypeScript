/// <reference path='fourslash.ts'/>

////interface [|Foo|] {
////}
////
////module [|Foo|] {
////    export interface Bar { }
////}
////
////function [|Foo|](): void {
////}
////
////var f1: [|Foo|].Bar;
////var f2: [|Foo|];
////[|Foo|].bind(this);

const [type1, namespace1, value1, namespace2, type2, value2] = test.ranges();
verify.rangesReferenceEachOther([type1, type2]);
verify.rangesReferenceEachOther([namespace1, namespace2]);
verify.rangesReferenceEachOther([value1, value2]);
