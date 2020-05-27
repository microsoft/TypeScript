/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|public [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}publicParam|]: number|]) {
////         let localPublic = [|publicParam|];
////         this.[|{| "isWriteAccess": true |}publicParam|] += 10;
////     }
//// }

const [rDef, ...ranges] = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(property) Foo.publicParam: number", ranges: [r0, r2] },
    { definition: "(parameter) publicParam: number", ranges: [r1] }
]);
