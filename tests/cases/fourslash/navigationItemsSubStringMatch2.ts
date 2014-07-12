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
////    var INITIATED123;
////    public horizon(): void;
////}

var notFoundSearchValue = "mPointThatIJustInitiated wrongKeyWord";

goTo.marker("file1");
// case sensitive matching for 'Horizon' will fail
verify.navigationItemsListCount(0, "distance Horizon INITIATED", "exact");
// case insensitive matching will find 'horizon' 
verify.navigationItemsListCount(1, "distance horizon INITIATED", "exact");
// case sensitive matching will find 'Distance' and INITIATED
verify.navigationItemsListCount(2, "Distance horizon INITIATED", "substring");
// case insensitive matching will find everything
verify.navigationItemsListCount(3, "distance horizon initiated", "substring");
// case sensitive matching will find 'INITIATED'
verify.navigationItemsListCount(1, "Distance Horizon INITIATED", "prefix");
// case insensitive matching will find 'INITIATED'
verify.navigationItemsListCount(2, "distance horizon initiated", "prefix");


verify.navigationItemsListCount(0, notFoundSearchValue, "exact");
verify.navigationItemsListCount(0, notFoundSearchValue, "prefix");
verify.navigationItemsListCount(0, notFoundSearchValue, "substring");