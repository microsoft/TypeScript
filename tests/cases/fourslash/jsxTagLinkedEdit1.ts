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


const linkedCursors = {ranges: [{start: 19, end: 22}, 
                                {start: 30, end: 33}],
                       wordPattern : 'div'};

verify.jsxMirrorCursor( {
    "0": linkedCursors,
    "1": linkedCursors,
    "2": linkedCursors,
    "3": linkedCursors,
    "4": linkedCursors,
    "5": linkedCursors,
    "6": undefined,
    "7": undefined,
    "8": undefined,
    "9": undefined,
    // "10":undefined, // if still a comment, this case doesnt yet work !!!!
    }
    );

