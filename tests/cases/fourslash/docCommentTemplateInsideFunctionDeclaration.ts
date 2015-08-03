/// <reference path='fourslash.ts' />

// @Filename: functionDecl.ts
////f/*0*/unction /*1*/foo/*2*/(/*3*/) /*4*/{ /*5*/}

test.markers().forEach((marker) => {
    goTo.position(marker.position);
    verify.noDocCommentTemplate();
});
