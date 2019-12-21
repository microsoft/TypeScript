/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class Foo {
////     constructor([|private [|{| "isWriteAccess": true, "isDefinition": true, "type": "number", "contextRangeIndex": 0 |}privateParam|]: number|],
////         [|public [|{| "isWriteAccess": true, "isDefinition": true, "type": "string", "contextRangeIndex": 2 |}publicParam|]: string|],
////         [|protected [|{| "isWriteAccess": true, "isDefinition": true, "type": "boolean", "contextRangeIndex": 4 |}protectedParam|]: boolean|]) {
////
////         let localPrivate = [|privateParam|];
////         this.[|{| "isWriteAccess": true |}privateParam|] += 10;
////
////         let localPublic = [|publicParam|];
////         this.[|{| "isWriteAccess": true |}publicParam|] += " Hello!";
////
////         let localProtected = [|protectedParam|];
////         this.[|{| "isWriteAccess": true |}protectedParam|] = false;
////     }
//// }

test.rangesByText().forEach((ranges, text) => {
    if (text !== "privateParam" && text !== "publicParam" && text !== "protectedParam") return;

    const [r0, r1, r2] = ranges;
    const type = r0.marker.data.type;
    verify.referenceGroups(ranges, [
        { definition: `(property) Foo.${text}: ${type}`, ranges: [r0, r2] },
        { definition: `(parameter) ${text}: ${type}`, ranges: [r1] }
    ]);
});
