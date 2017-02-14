/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isWriteAccess": true, "isDefinition": true |}__bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|__bar|];

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) Foo.__bar(): number", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) Foo.__bar(): number", ranges: [r0] },
    { definition: "(method) Foo.__bar(): number", ranges: [r1] }
]);
