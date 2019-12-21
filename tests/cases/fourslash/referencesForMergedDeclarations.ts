/// <reference path='fourslash.ts'/>

////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Foo|] {
////}|]
////
////[|module [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}Foo|] {
////    export interface Bar { }
////}|]
////
////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}Foo|](): void {
////}|]
////
////var f1: [|Foo|].Bar;
////var f2: [|Foo|];
////[|Foo|].bind(this);

const [type1Def, type1, namespace1Def, namespace1, value1Def, value1, namespace2, type2, value2] = test.ranges();
verify.singleReferenceGroup("interface Foo\nnamespace Foo", [type1, type2]);
verify.singleReferenceGroup("namespace Foo", [namespace1, namespace2]);
verify.singleReferenceGroup("namespace Foo\nfunction Foo(): void", [value1, value2]);
