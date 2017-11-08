/// <reference path="fourslash.ts" />

////const points = [{ x: 1, y: 2 }];
////points.forEach(({ /*a*/ }) => { });
////const { /*b*/ } = points[0];
////for (const { /*c*/ } of points) {}

goTo.eachMarker(() => {
    verify.completionListContains("x");
    verify.completionListContains("y");
    verify.completionListCount(2);
});
