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

const [glob, f0, f1, g0, g1, x, y, constructor, method, propDef, propUse] = test.ranges();
verify.singleReferenceGroup("this: typeof globalThis", [glob]);
verify.singleReferenceGroup("(parameter) this: any", [f0, f1]);
verify.singleReferenceGroup("(parameter) this: any", [g0, g1]);
verify.singleReferenceGroup("this: typeof C", [x, y]);
verify.singleReferenceGroup("this: this", [constructor, method]);
verify.singleReferenceGroup("(property) this: number", [propDef, propUse]);
