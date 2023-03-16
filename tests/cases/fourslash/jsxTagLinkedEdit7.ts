/// <reference path='fourslash.ts' />

// @FileName: /fragment.tsx
////const jsx = (
////    /*7*/</*0*/>/*1*/
////        <img />
////    /*8*/</*2*///*3*/>/*4*/
////);
////const jsx2 = (
////    <>/*5*/
////    </>
////);
////const jsx3 = (
////    </*6*/>
////        <div>
////    </>
////);

const linkedCursors7 = {ranges: [{start: 14, end: 14}, 
                            {start: 43, end: 43}],
                        wordPattern : undefined};

verify.jsxMirrorCursor( {
    "0": linkedCursors7,
    "1": undefined,
    "2": undefined,
    "3": linkedCursors7,
    "4": undefined,
    "5": undefined,
    // "6": linkedCursors7, // I don't know what's supposed to happen in this case
    "7": undefined,
    "8": undefined,
}); 