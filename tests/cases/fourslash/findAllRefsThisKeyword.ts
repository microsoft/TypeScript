/// <reference path='fourslash.ts' />
// @noLib: true

////[|this|];
////function f([|{| "isWriteAccess": true, "isDefinition": true |}this|]) {
////    return [|this|];
////    function g([|{| "isWriteAccess": true, "isDefinition": true |}this|]) { return [|this|]; }
////}
////class C {
////    static x() {
////        [|this|];
////    }
////    static y() {
////        () => [|this|];
////    }
////    constructor() {
////        [|this|];
////    }
////    method() {
////        () => [|this|];
////    }
////}
////// These are *not* real uses of the 'this' keyword, they are identifiers.
////const x = { [|{| "isWriteAccess": true, "isDefinition": true |}this|]: 0 }
////x.[|this|];

const [global, f0, f1, g0, g1, x, y, constructor, method, propDef, propUse] = test.ranges();
verify.singleReferenceGroup("this", [global]);
verify.referenceGroups(f0, [{ definition: "(parameter) this: any", ranges: [f0, f1] }]);
verify.referenceGroups(f1, [{ definition: "this: any", ranges: [f0, f1] }]);
verify.referenceGroups(g0, [{ definition: "(parameter) this: any", ranges: [g0, g1] }]);
verify.referenceGroups(g1, [{ definition: "this: any", ranges: [g0, g1] }]);
verify.singleReferenceGroup("this: typeof C", [x, y]);
verify.singleReferenceGroup("this: this", [constructor, method]);
verify.singleReferenceGroup("(property) this: number", [propDef, propUse]);
