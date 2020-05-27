/// <reference path='fourslash.ts'/>

////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Foo|] { }|]
////[|module [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}Foo|] { export interface Bar { } }|]
////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}Foo|]() { }|]
////
////[|export = [|{| "contextRangeIndex": 6 |}Foo|];|]

const ranges = test.ranges();
const [r0Def, r0, r1Def, r1, r2Def, r2, r3Def, r3] = ranges;
verify.referenceGroups(r0, [{ definition: "interface Foo\nnamespace Foo", ranges: [r0, r3] }]);
verify.referenceGroups(r1, [{ definition: "namespace Foo", ranges: [r1, r3] }]);
verify.referenceGroups(r2, [{ definition: "namespace Foo\nfunction Foo(): void", ranges: [r2, r3] }]);
verify.referenceGroups(r3, [{ definition: "interface Foo\nnamespace Foo\nfunction Foo(): void", ranges: [r0, r1, r2, r3] }]);
