/// <reference path="fourslash.ts" />

////class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {
////    static s() {
////        [|this|];
////    }
////    static get f() {
////        return [|this|];
////
////        function inner() { this; }
////        class Inner { x = this; }
////    }
////}

const [r0, r1, r2] = test.ranges();
verify.referenceGroups(r0, [{ definition: "class C", ranges: [r0, r1, r2] }]);
verify.singleReferenceGroup("this: typeof C", [r1, r2]);

verify.renameLocations(r0, [r0]);
