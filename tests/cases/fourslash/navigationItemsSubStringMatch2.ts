/// <reference path="fourslash.ts"/>
// @Filename: navigationItemsContainsNoAnonymousFunctions_0.ts
/////*file1*/
////module Shapes {
////    export class Point {
////        private originPointAttheHorizon = 0.0;
////
////        get distanceFromOrigin(distanceParam): number {
////            var distanceLocal;
////            return 0;
////        }
////    }
////}
////
////var myPointThatIJustInitiated = new Shapes.Point();
////interface IDistance{
////    INITIATED123;
////    public horizon(): void;
////}
var notFoundSearchValue = "mPointThatIJustInitiated wrongKeyWord";

goTo.marker("file1");
// case sensitive matching for 'Horizon' will fail
verify.navigationItemsListCount(1, "Horizon", "exact");
// case insensitive matching will find 'horizon' 
verify.navigationItemsListCount(1, "horizon", "exact");
// case sensitive matching will find 'Distance' and INITIATED
verify.navigationItemsListCount(1, "Distance", "substring");
// case sensitive matching will find 'INITIATED'
verify.navigationItemsListCount(1, "INITIATED", "prefix");


verify.navigationItemsListCount(0, notFoundSearchValue, "exact");
verify.navigationItemsListCount(0, notFoundSearchValue, "prefix");
verify.navigationItemsListCount(0, notFoundSearchValue, "substring");