/// <reference path='fourslash.ts' />


////interface AnimationOptions {
////    deltaX: number;
////    deltaY: number;
////    easing: "ease-in" | "ease-out" | "[|ease-in-out|]";
////}
////
////function animate(o: AnimationOptions) { }
////
////animate({ deltaX: 100, deltaY: 100, easing: "[|ease-in-out|]" });

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}
