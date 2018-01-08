/// <reference path="fourslash.ts" />

////class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {
////    static s() {
////        [|this|];
////    }
////    static get f() { return [|this|]; }
////}

const [r0, r1, r2] = test.ranges();
verify.referenceGroups(r0, [{ definition: "class C", ranges: [r0, r1, r2] }]);
verify.referenceGroups([r1, r2], [{ definition: "this: typeof C", ranges: [r1, r2] }]);
