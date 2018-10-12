/// <reference path="fourslash.ts" />

// @noLib: true

// @Filename: /a.ts
////class C {
////    get [|{| "isWriteAccess": true, "isDefinition": true |}m|](): number { return 0; }
////}
////const { [|{| "isWriteAccess": true, "isDefinition": true |}m|] } = new C();

const [r0, r1] = test.ranges();
verify.quickInfoAt(r0, "(property) C.m: number");
verify.referenceGroups(r0, [{ definition: "(property) C.m: number", ranges: [r0, r1] }]);
verify.referenceGroups(r1, [
    { definition: "(property) C.m: number", ranges: [r0] },
    { definition: "const m: number", ranges: [r1] },
]);
