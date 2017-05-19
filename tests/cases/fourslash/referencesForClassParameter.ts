/// <reference path='fourslash.ts'/>

// Reference to a class parameter.

////var p = 2;
////
////class p { }
////
////class foo {
////    constructor (public [|{| "isWriteAccess": true, "isDefinition": true |}p|]: any) {
////    }
////
////    public f(p) {
////        this.[|p|] = p;
////    }
////
////}
////
////var n = new foo(undefined);
////n.[|p|] = null;

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups([r0, r1], [{ definition: "(property) foo.p: any", ranges }]);
verify.referenceGroups(r2, [
    { definition: "(property) foo.p: any", ranges: [r0, r1] },
    { definition: "(property) foo.p: any", ranges: [r2] }
]);
