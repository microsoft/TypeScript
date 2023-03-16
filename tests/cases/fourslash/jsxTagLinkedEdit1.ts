/// <reference path='fourslash.ts' />

// the content of basic.tsx
//const jsx = (
//   <div>
//   </div>
//);


// @Filename: /basic.tsx
////const jsx = (
////    </*0*/d/*1*/iv/*2*/>/*7*/
////    </*6*///*3*/di/*4*/v/*5*/>/*9*/
////);
////const jsx2 = (
////   <div>
////   < /*8*/ /div>
////);
////const jsx3 = (
////   </*10*/ div>
////   </div>
////);


const linkedCursors1 = {ranges: [{start: 19, end: 22}, 
                                 {start: 30, end: 33}],
                        wordPattern : 'div'};

verify.jsxMirrorCursor( {
    "0": linkedCursors1,
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": linkedCursors1,
    "4": linkedCursors1,
    "5": linkedCursors1,
    "6": undefined,
    "7": undefined,
    "8": undefined,
    "9": undefined,
    // "10":undefined, // if still a comment, case doesnt yet work !!!!
    });

