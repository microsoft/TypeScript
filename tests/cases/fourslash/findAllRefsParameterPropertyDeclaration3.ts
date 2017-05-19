/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected [|{| "isWriteAccess": true, "isDefinition": true |}protectedParam|]: number) {
////         let localProtected = [|protectedParam|];
////         this.[|protectedParam|] += 10;
////     }
//// }

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(property) Foo.protectedParam: number", ranges: [r0, r2] },
    { definition: "(parameter) protectedParam: number", ranges: [r1] }
]);
