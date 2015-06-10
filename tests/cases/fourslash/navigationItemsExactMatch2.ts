/// <reference path="fourslash.ts"/>
// @Filename: navigationItemsContainsNoAnonymousFunctions_0.ts
/////*file1*/
////module Shapes {
////    class Point {
////        private _origin = 0.0;
////        private distanceFromA = 0.0;
////
////        get distance1(distanceParam): number {
////            var distanceLocal;
////            return 0;
////        }
////    }
////}
////
////var point = new Shapes.Point();
////function distance2(distanceParam1): void {
////    var distanceLocal1;
////}

goTo.marker("file1");
verify.navigationItemsListCount(2, "point", "exact");
verify.navigationItemsListCount(5, "distance", "prefix");
verify.navigationItemsListCount(1, "origin", "substring");

verify.navigationItemsListCount(0, "square", "exact");
verify.navigationItemsListCount(0, "square", "prefix");
verify.navigationItemsListCount(0, "square", "substring");