/// <reference path="fourslash.ts"/>
// @Filename: navigationItemsContainsNoAnonymousFunctions_0.ts
/////*file1*/
////module Shapes {
////    export class Point {
////        private originality = 0.0;
////        private distanceFromOrig = 0.0;
////        get distanceFarFarAway(distanceFarFarAwayParam: number): number {
////            var distanceFarFarAwayLocal;
////            return 0;
////        }
////    }
////}
////var pointsSquareBox = new Shapes.Point();
////function PointsFunc(): void {
//// var pointFuncLocal;
////}
////interface OriginI {
////    var 123;
////    var origin1;
////    public _distance(distanceParam): void;
////}

var notFoundSearchValue = "mPointThatIJustInitiated wrongKeyWord";

goTo.marker("file1");
verify.navigationItemsListCount(3, "origin", "prefix");
verify.navigationItemsListCount(3, "distance", "prefix");

verify.navigationItemsListCount(0, notFoundSearchValue, "exact");
verify.navigationItemsListCount(0, notFoundSearchValue, "prefix");
verify.navigationItemsListCount(0, notFoundSearchValue, "substring");