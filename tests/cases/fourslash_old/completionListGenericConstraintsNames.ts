/// <reference path="fourslash.ts" />

////interface IBar {
////}
////
////class BarWrapper<T extends IBar, U, M> {
////    private value: /*1*/;
////    public getValue(v: /*2*/T): /*3*/ {
////    }
////}
////function foo<T, U, M>(p1: T, p2: /*21*/U) : /*22*/ {
////    var x : /*23*/
////}
////class MethodTest {
////    public method<T, U, M>(p1: T, p2: U, p3:/*31*/ M): Array</*32*/M> {
////        return </*33*/>null;
////    }
////}

 test.markers().forEach((marker) => {
     goTo.position(marker.position, marker.fileName);
     verify.memberListContains("T");
     verify.memberListContains("U");
     verify.memberListContains("M");
 });
