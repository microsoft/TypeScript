/// <reference path="fourslash.ts"/>

// @noLib: true

////[|{| "name": "Shapes", "kind": "module" |}module Shapes {
////    [|{| "name": "Point", "kind": "class", "kindModifiers": "export", "containerName": "Shapes", "containerKind": "module" |}export class Point {
////        [|{| "name": "originality", "kind": "property", "kindModifiers": "private", "containerName": "Point", "containerKind": "class" |}private originality = 0.0;|]
////
////        [|{| "name": "distanceFromOrig", "kind": "property", "kindModifiers": "private", "containerName": "Point", "containerKind": "class" |}private distanceFromOrig = 0.0;|]
////
////        [|{| "name": "distanceFarFarAway", "kind": "getter", "containerName": "Point", "containerKind": "class" |}get distanceFarFarAway(): number { return 0; }|]
////    }|]
////}|]
////
////var [|{| "name": "xyz", "kind": "var" |}xyz = new Shapes.Point()|];

for (const range of test.ranges()) {
    const { name } = range.marker.data;
    verify.navigateTo({
        pattern: name.slice(0, name.length - 1),
        expected: [{ ...range.marker.data, range, matchKind: "prefix" }],
    });
}
