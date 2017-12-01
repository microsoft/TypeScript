/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isWriteAccess": true, "isDefinition": true |}____bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|____bar|];

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) Foo.____bar(): number", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) Foo.____bar(): number", ranges: [r0] },
    { definition: "(method) Foo.____bar(): number", ranges: [r1] }
]);
