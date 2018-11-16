/// <reference path="fourslash.ts"/>

// @noLib: true

////[|{| "name": "Shapes", "kind": "module" |}module Shapes {
////    [|{| "name": "Point", "kind": "class", "kindModifiers": "export", "containerName": "Shapes", "containerKind": "module" |}export class Point {
////        [|{| "name": "origin", "kind": "property", "kindModifiers": "private", "containerName": "Point", "containerKind": "class" |}private origin = 0.0;|]
////
////        [|{| "name": "distFromZero", "kind": "property", "kindModifiers": "private", "containerName": "Point", "containerKind": "class" |}private distFromZero = 0.0;|]
////
////        [|{| "name": "distance", "kind": "getter", "containerName": "Point", "containerKind": "class" |}get distance(): number { return 0; }|]
////    }|]
////}|]
////
////var [|{| "name": "xyz", "kind": "var" |}xyz = new Shapes.Point()|];

for (const range of test.ranges()) {
    verify.navigateTo({
        pattern: range.marker.data.name,
        expected: [{ ...range.marker.data, range }],
    });
}
