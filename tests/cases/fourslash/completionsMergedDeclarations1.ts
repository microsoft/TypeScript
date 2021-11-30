/// <reference path='fourslash.ts'/>

////interface Point {
////    x: number;
////    y: number;
////}
////function point(x: number, y: number): Point {
////    return { x: x, y: y };
////}
////module point {
////    export var origin = point(0, 0);
////    export function equals(p1: Point, p2: Point) {
////        return p1.x == p2.x && p1.y == p2.y;
////    }
////}
////var p1 = /*1*/point(0, 0);
////var p2 = point./*2*/origin;
////var b = point./*3*/equals(p1, p2);

verify.completions(
    { marker: "1", includes: "point", isNewIdentifierLocation: true },
    { marker: ["2", "3"], exact: ["equals", "origin", ...completion.functionMembersWithPrototype] },
);
