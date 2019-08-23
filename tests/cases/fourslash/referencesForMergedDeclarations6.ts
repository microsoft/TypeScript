/// <reference path='fourslash.ts'/>

////interface Foo { }
////[|module [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Foo|] {
////    export interface Bar { }
////    export module Bar { export interface Baz { } }
////    export function Bar() { }
////}|]
////
////// module
////import a1 = [|Foo|];

verify.singleReferenceGroup("namespace Foo", "Foo");
