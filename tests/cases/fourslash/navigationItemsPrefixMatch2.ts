/// <reference path="fourslash.ts"/>

////module Shapes {
////    export class Point {
////        [|private originality = 0.0;|]
////        [|private distanceFromOrig = 0.0;|]
////        [|get distanceFarFarAway(distanceFarFarAwayParam: number): number {
////            var [|distanceFarFarAwayLocal|];
////            return 0;
////        }|]
////    }
////}
////var pointsSquareBox = new Shapes.Point();
////function PointsFunc(): void {
//// var pointFuncLocal;
////}
////[|interface OriginI {
////    123;
////    [|origin1;|]
////    [|public _distance(distanceParam): void;|]
////}|]

const [r0, r1, r2, r3, r4, r5, r6] = test.ranges();
verify.navigateTo(
    {
        pattern: "origin",
        expected: [
            { name: "origin1", matchKind: "prefix", kind: "property", range: r5, containerName: "OriginI", containerKind: "interface" },
            { name: "originality", matchKind: "prefix", kind: "property", kindModifiers: "private", range: r0, containerName: "Point", containerKind: "class" },
            { name: "OriginI", matchKind: "prefix", isCaseSensitive: false, kind: "interface", range: r4 },
        ],
    },
    {
        pattern: "distance",
        expected: [
            { name: "distanceFarFarAway", matchKind: "prefix", kind: "getter", range: r2, containerName: "Point", containerKind: "class" },
            { name: "distanceFarFarAwayLocal", matchKind: "prefix", kind: "var", range: r3, containerName: "distanceFarFarAway", containerKind: "getter" },
            { name: "distanceFromOrig", matchKind: "prefix", kind: "property", kindModifiers: "private", range: r1, containerName: "Point", containerKind: "class" },
            { name: "_distance", matchKind: "substring", kind: "method", kindModifiers: "public", range: r6, containerName: "OriginI", containerKind: "interface" },
        ],
    },
    {
        pattern: "mPointThatIJustInitiated wrongKeyWord",
        expected: [],
    },
);
