/// <reference path="../fourslash.ts"/>

/////// Module
////[|{| "name": "Shapes", "kind": "module" |}module Shapes {
////
////    // Class
////    [|{| "name": "Point", "kind": "class", "kindModifiers": "export", "containerName": "Shapes", "containerKind": "module" |}export class Point {
////        // Instance member
////        [|{| "name": "origin", "kind": "property", "kindModifiers": "private", "containerName": "Point", "containerKind": "class" |}private origin = 0.0;|]
////
////        [|{| "name": "distFromZero", "kind": "property", "kindModifiers": "private", "containerName": "Point", "containerKind": "class" |}private distFromZero = 0.0;|]
////
////        // Getter
////        [|{| "name": "distance", "kind": "getter", "containerName": "Point", "containerKind": "class" |}get distance(): number { return 0; }|]
////    }|]
////}|]
////
////// Local variables
////var [|{| "name": "xyz", "kind": "var" |}xyz = new Shapes.Point()|];

for (const range of test.ranges()) {
    verify.navigateTo({
        pattern: range.marker.data.name,
        expected: [{ ...range.marker.data, range }],
    });
}
