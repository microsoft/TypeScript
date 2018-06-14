/// <reference path='fourslash.ts'/>

////interface [|{| "isWriteAccess": true, "isDefinition": true |}Foo|] {
////}
////
////module [|{| "isWriteAccess": true, "isDefinition": true |}Foo|] {
////    export interface Bar { }
////}
////
////function [|{| "isWriteAccess": true, "isDefinition": true |}Foo|](): void {
////}
////
////var f1: [|Foo|].Bar;
////var f2: [|Foo|];
////[|Foo|].bind(this);

const [type1, namespace1, value1, namespace2, type2, value2] = test.ranges();
verify.singleReferenceGroup("interface Foo\nnamespace Foo\nfunction Foo(): void", [type1, type2]);
verify.singleReferenceGroup("namespace Foo\nfunction Foo(): void", [namespace1, namespace2]);
verify.singleReferenceGroup("namespace Foo\nfunction Foo(): void", [value1, value2]);
