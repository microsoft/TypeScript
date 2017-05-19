/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(private [|{| "isWriteAccess": true, "isDefinition": true |}privateParam|]: number) {
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////     }
//// }

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(property) Foo.privateParam: number", ranges: [r0, r2] },
    { definition: "(parameter) privateParam: number", ranges: [r1] }
]);
