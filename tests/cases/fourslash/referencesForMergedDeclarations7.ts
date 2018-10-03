/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo {
////    export interface [|{| "isWriteAccess": true, "isDefinition": true |}Bar|] { }
////    export module [|{| "isWriteAccess": true, "isDefinition": true |}Bar|] { export interface Baz { } }
////    export function [|{| "isWriteAccess": true, "isDefinition": true |}Bar|]() { }
////}
////
////// module, value and type
////import a2 = Foo.[|Bar|];

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(r0, [{ definition: "interface Foo.Bar\nnamespace Foo.Bar\nfunction Foo.Bar(): void", ranges: [r0, r3] }]);
verify.referenceGroups(r1, [{ definition: "namespace Foo.Bar\nfunction Foo.Bar(): void", ranges: [r1, r3] }]);
verify.referenceGroups(r2, [{ definition: "namespace Foo.Bar\nfunction Foo.Bar(): void", ranges: [r2, r3] }]);
verify.referenceGroups(r3, [{ definition: "interface Foo.Bar\nnamespace Foo.Bar\nfunction Foo.Bar(): void", ranges }]);
