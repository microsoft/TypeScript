/// <reference path='fourslash.ts' />

// @Filename: functionDecl.ts
////f/*0*/unction /*1*/foo/*2*/(/*3*/) /*4*/{ /*5*/}

goTo.eachMarker(() => verify.noDocCommentTemplate());
