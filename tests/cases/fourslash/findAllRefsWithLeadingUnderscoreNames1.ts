/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isWriteAccess": true, "isDefinition": true |}_bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|_bar|];

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) Foo._bar(): number", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) Foo._bar(): number", ranges: [r0] },
    { definition: "(method) Foo._bar(): number", ranges: [r1] }
]);
