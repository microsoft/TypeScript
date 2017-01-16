/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface [|Bar|] { }
////    export module [|Bar|] { export interface Baz { } }
////    export function [|Bar|]() { }
////}
////
////// module, value and type
////import a2 = Foo.[|Bar|];

const [r0, r1, r2, r3] = test.ranges();
verify.referencesOf(r3, [r0, r1, r2, r3]);
