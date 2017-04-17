/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class Foo {
////     constructor(private [|{| "isWriteAccess": true, "isDefinition": true, "type": "number" |}privateParam|]: number,
////         public [|{| "isWriteAccess": true, "isDefinition": true, "type": "string" |}publicParam|]: string,
////         protected [|{| "isWriteAccess": true, "isDefinition": true, "type": "boolean" |}protectedParam|]: boolean) {
////
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////
////         let localPublic = [|publicParam|];
////         this.[|publicParam|] += " Hello!";
////
////         let localProtected = [|protectedParam|];
////         this.[|protectedParam|] = false;
////     }
//// }

test.rangesByText().forEach((ranges, text) => {
    const [r0, r1, r2] = ranges;
    const type = r0.marker.data.type;
    verify.referenceGroups(ranges, [
        { definition: `(property) Foo.${text}: ${type}`, ranges: [r0, r2] },
        { definition: `(parameter) ${text}: ${type}`, ranges: [r1] }
    ]);
});
