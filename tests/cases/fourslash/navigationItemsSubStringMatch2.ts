/// <reference path="fourslash.ts"/>

////module Shapes {
////    export class Point {
////        [|private originPointAtTheHorizon = 0.0;|]
////
////        [|get distanceFromOrigin(distanceParam): number {
////            var [|distanceLocal|];
////            return 0;
////        }|]
////    }
////}
////
////var [|myPointThatIJustInitiated = new Shapes.Point()|];
////[|interface IDistance{
////    [|INITIATED123;|]
////    [|public horizon(): void;|]
////}|]

const [r0, r1, r2, r3, r4, r5, r6] = test.ranges()
const horizon: FourSlashInterface.ExpectedNavigateToItem =
    { name: "horizon", kind: "method", kindModifiers: "public", range: r6, containerName: "IDistance", containerKind: "interface" };
const origin: FourSlashInterface.ExpectedNavigateToItem =
    { name: "originPointAtTheHorizon", kind: "property", kindModifiers: "private", range: r0, containerName: "Point", containerKind: "class" };

verify.navigateTo(
    {
        pattern: "Horizon",
        expected: [
            { ...horizon, isCaseSensitive: false },
            { ...origin, matchKind: "substring" },
        ],
    },
    {
        pattern: "horizon",
        expected: [
            horizon,
            { ...origin, matchKind: "substring", isCaseSensitive: false },
        ],
    },
    {
        pattern: "Distance",
        expected: [
            { name: "distanceFromOrigin", matchKind: "prefix", isCaseSensitive: false, kind: "getter", range: r1, containerName: "Point", containerKind: "class" },
            { name: "distanceLocal", matchKind: "prefix", isCaseSensitive: false, kind: "var", range: r2, containerName: "distanceFromOrigin", containerKind: "getter" },
            { name: "IDistance", matchKind: "substring", kind: "interface", range: r4 },
        ],
    },
    {
        pattern: "INITIATED",
        expected: [
            { name: "INITIATED123", matchKind: "prefix", kind: "property", range: r5, containerName: "IDistance", containerKind: "interface" },
        ],
    },
    {
        pattern: "mPointThatIJustInitiated wrongKeyWord",
        expected: [
            { name: "myPointThatIJustInitiated", matchKind: "camelCase", kind: "var", range: r3 }
        ],
    },
);
