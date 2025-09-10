/// <reference path="../fourslash.ts"/>

/////// Module
////[|{| "name": "MyShapes", "kind": "module" |}namespace MyShapes {
////
////    // Class
////    [|{| "name": "MyPoint", "kind": "class", "kindModifiers": "export", "containerName": "MyShapes", "containerKind": "module" |}export class MyPoint {
////        // Instance member
////        [|{| "name": "MyoriginAttheHorizon", "kind": "property", "kindModifiers": "private", "containerName": "MyPoint", "containerKind": "class" |}private MyoriginAttheHorizon = 0.0;|]
////
////        // Getter
////        [|{| "name": "MydistanceFromOrigin", "kind": "getter", "containerName": "MyPoint", "containerKind": "class" |}get MydistanceFromOrigin(): number { return 0; }|]
////    }|]
////}|]
////
////// Local variables
////var [|{| "name": "myXyz", "kind": "var" |}myXyz = new Shapes.Point()|];

for (const range of test.ranges()) {
    verify.navigateTo({
        pattern: range.marker.data.name.slice(2),
        expected: [{ ...range.marker.data, range, matchKind: "substring" }],
    });
}
