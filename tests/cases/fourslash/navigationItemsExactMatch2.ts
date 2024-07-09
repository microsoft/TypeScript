/// <reference path="fourslash.ts"/>

////module Shapes {
////    [|class Point {
////        [|private _origin = 0.0;|]
////        [|private distanceFromA = 0.0;|]
////
////        [|get distance1(distanceParam): number {
////            var [|distanceLocal|];
////            return 0;
////        }|]
////    }|]
////}
////
////var [|point = new Shapes.Point()|];
////[|function distance2(distanceParam1): void {
////    var [|distanceLocal1|];
////}|]

const [r_Point, r_origin, r_distanceFromA, r_distance1, r_distanceLocal, r_point, r_distance2, r_distanceLocal1] = test.ranges();

verify.navigateTo(
    {
        pattern: "point",
        expected: [
            { name: "point", kind: "var", range: r_point },
            { name: "Point", kind: "class", isCaseSensitive: false, range: r_Point, containerName: "Shapes", containerKind: "module" },
        ],
    },
    {
        pattern: "distance",
        expected: [
            { name: "distance1", matchKind: "prefix", kind: "getter", range: r_distance1, containerName: "Point", containerKind: "class" },
            { name: "distance2", matchKind: "prefix", kind: "function", range: r_distance2 },
            { name: "distanceFromA", matchKind: "prefix", kind: "property", kindModifiers: "private", range: r_distanceFromA, containerName: "Point", containerKind: "class" },
            { name: "distanceLocal", matchKind: "prefix", kind: "var", range: r_distanceLocal, containerName: "distance1", containerKind: "getter" },
            { name: "distanceLocal1", matchKind: "prefix", kind: "var", range: r_distanceLocal1, containerName: "distance2", containerKind: "function" },
        ],
    },
    {
        pattern: "origin",
        expected: [
            { name: "_origin", matchKind: "substring", kind: "property", kindModifiers: "private", range: r_origin, containerName: "Point", containerKind: "class" },
        ],
    },
    {
        pattern: "square",
        expected: [],
    }
);
