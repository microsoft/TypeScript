/// <reference path="./fourslash.ts" />

////interface IFoo {
////    [|{| "isWriteAccess": true, "isDefinition": true |}a|]: string;
////}
////class C<T extends IFoo> {
////    method() {
////        var x: T = {
////            [|{| "isWriteAccess": true, "isDefinition": true |}a|]: ""
////        };
////        x.[|a|];
////    }
////}
////
////
////var x: IFoo = {
////    [|{| "isWriteAccess": true, "isDefinition": true |}a|]: "ss"
////};

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups([r0, r2], [{ definition: "(property) IFoo.a: string", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(property) IFoo.a: string", ranges: [r0, r2, r3] },
    { definition: "(property) a: string", ranges: [r1] }
]);
verify.referenceGroups(r3, [
    { definition: "(property) IFoo.a: string", ranges: [r0, r1, r2] },
    { definition: "(property) a: string", ranges: [r3] }
]);
