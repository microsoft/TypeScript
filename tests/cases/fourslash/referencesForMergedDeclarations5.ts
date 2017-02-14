/// <reference path='fourslash.ts'/>

////interface [|{| "isWriteAccess": true, "isDefinition": true |}Foo|] { }
////module [|{| "isWriteAccess": true, "isDefinition": true |}Foo|] { export interface Bar { } }
////function [|{| "isWriteAccess": true, "isDefinition": true |}Foo|]() { }
////
////export = [|Foo|];

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(r0, [{ definition: "interface Foo\nnamespace Foo\nfunction Foo(): void", ranges: [r0, r3] }]);
verify.referenceGroups(r1, [{ definition: "namespace Foo\nfunction Foo(): void", ranges: [r1, r3] }]);
verify.referenceGroups(r2, [{ definition: "function Foo(): void\nnamespace Foo", ranges: [r2, r3] }]);
verify.referenceGroups(r3, [{ definition: "interface Foo\nnamespace Foo\nfunction Foo(): void", ranges }]);
