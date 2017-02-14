/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isWriteAccess": true, "isDefinition": true |}___bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|___bar|];

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) Foo.___bar(): number", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) Foo.___bar(): number", ranges: [r0] },
    { definition: "(method) Foo.___bar(): number", ranges: [r1] }
]);
