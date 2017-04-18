/// <reference path='fourslash.ts'/>

// Class references should work across file and not find local variables.

// @Filename: referenceToClass_1.ts
////class [|{| "isWriteAccess": true, "isDefinition": true |}foo|] {
////    public n: [|foo|];
////    public foo: number;
////}
////
////class bar {
////    public n: [|foo|];
////    public k = new [|foo|]();
////}
////
////module mod {
////    var k: [|foo|] = null;
////}

// @Filename: referenceToClass_2.ts
////var k: [|foo|];

const ranges = test.ranges();
const [r0, r1, r2, r3, r4, r5] = ranges;
verify.referenceGroups([r0, r1, r2, r4, r5], [{ definition: "class foo", ranges }]);
verify.referenceGroups(r3, [{ definition: "constructor foo(): foo", ranges }]);
