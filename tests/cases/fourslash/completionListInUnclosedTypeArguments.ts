/// <reference path='fourslash.ts'/>

////let x = 10;
////type Type = void;
////declare function f<T>(): void;
////declare function f2<T, U>(): void;
////f</*1a*/T/*2a*/y/*3a*/
////f</*1b*/T/*2b*/y/*3b*/;
////f</*1c*/T/*2c*/y/*3c*/>
////f</*1d*/T/*2d*/y/*3d*/>
////f</*1eTypeOnly*/T/*2eTypeOnly*/y/*3eTypeOnly*/>();
////
////f2</*1k*/T/*2k*/y/*3k*/,
////f2</*1l*/T/*2l*/y/*3l*/,/*4l*/T/*5l*/y/*6l*/
////f2</*1m*/T/*2m*/y/*3m*/,/*4m*/T/*5m*/y/*6m*/;
////f2</*1n*/T/*2n*/y/*3n*/,/*4n*/T/*5n*/y/*6n*/>
////f2</*1o*/T/*2o*/y/*3o*/,/*4o*/T/*5o*/y/*6o*/>
////f2</*1pTypeOnly*/T/*2pTypeOnly*/y/*3pTypeOnly*/,/*4pTypeOnly*/T/*5pTypeOnly*/y/*6pTypeOnly*/>();
////
////f2<typeof /*1uValueOnly*/x, /*4u*/T/*5u*/y/*6u*/
////
////f2</*1x*/T/*2x*/y/*3x*/, () =>/*4x*/T/*5x*/y/*6x*/
////f2<() =>/*1y*/T/*2y*/y/*3y*/, () =>/*4y*/T/*5y*/y/*6y*/
////f2<any, () =>/*1z*/T/*2z*/y/*3z*/


goTo.eachMarker((marker) => {
    const markerName = test.markerName(marker);
    if (markerName.endsWith("TypeOnly")) {
        verify.not.completionListContains("x");
    }
    else {
        verify.completionListContains("x");
    }

    if (markerName.endsWith("ValueOnly")) {
        verify.not.completionListContains("Type");
    }
    else {
        verify.completionListContains("Type");
    }
});