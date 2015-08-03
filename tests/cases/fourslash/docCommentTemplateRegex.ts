/// <reference path='fourslash.ts' />

// @Filename: regex.ts
////var regex = /*0*///*1*/asdf/*2*/ /*3*///*4*/;

test.markers().forEach((marker) => {
    goTo.position(marker.position);
    verify.noDocCommentTemplate();
});