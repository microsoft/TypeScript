/// <reference path='fourslash.ts' />
// @noLib: true

////[|this|];
////function f([|this|]) {
////    return [|this|];
////    function g([|this|]) { return [|this|]; }
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
////const x = { [|this|]: 0 }
////x.[|this|];

const [global, f0, f1, g0, g1, x, y, constructor, method, propDef, propUse] = test.ranges();
verify.referencesOf(global, [global]);
verify.rangesReferenceEachOther([f0, f1]);
verify.rangesReferenceEachOther([g0, g1]);
verify.rangesReferenceEachOther([x, y]);
verify.rangesReferenceEachOther([constructor, method]);
verify.rangesReferenceEachOther([propDef, propUse]);
