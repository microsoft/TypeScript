/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface Bar { }
////    export module [|{| "isWriteAccess": true, "isDefinition": true |}Bar|] { export interface Baz { } }
////    export function Bar() { }
////}
////
////// module
////import a3 = Foo.[|Bar|].Baz;

verify.singleReferenceGroup("namespace Foo.Bar\nfunction Foo.Bar(): void");
