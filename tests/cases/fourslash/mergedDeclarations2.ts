/// <reference path='fourslash.ts'/>

////class point {
////    constructor(public x: number, public y: number) { }
////}
////module point {
////    export var origin = new point(0, 0);
////    export function equals(p1: point, p2: point) {
////        return p1.x == p2.x && p1.y == p2.y;
////    }
////}
////var p1 = new point(0, 0);
////var p2 = point./*1*/origin;
////var b = point./*2*/equals(p1, p2);

goTo.marker('1');
verify.completionListContains('origin');

goTo.marker('2');
verify.completionListContains('equals');