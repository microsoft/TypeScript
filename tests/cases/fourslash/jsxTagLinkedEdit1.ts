/// <reference path='fourslash.ts' />

// the content of basic.tsx
//const jsx = (
//   <div>
//   </div>
//);

// @Filename: /basic.tsx
////const jsx = (
////    </*0*/d/*1*/iv/*2*/>/*7*/
////    </*6*///*3*/di/*4*/v/*5*/>/*8*/
////);

// @Filename: /whitespaceInvalidClosing.tsx
////const jsx = (
////   <div>
////   < /*9*/ /div>
////);

// @Filename: /whitespaceOpening.tsx
////const jsx3 = (
////   </*10*/ /*11*/div/*12*/ /*13*/> /*14*/
////   </di/*A*/v>
////);

// @Filename: /whitespaceClosing.tsx
////const jsx = (
////   <di/*B*/v>
////   <//*15*/ /*16*/div/*17*/ /*18*/> /*19*/
////);

const linkedCursors1 = {ranges: [{start: 19, length: 3}, 
                                 {start: 30, length: 3}],
                        wordPattern : 'div'};

verify.jsxLinkedEdit( {
    "0": linkedCursors1,
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": linkedCursors1,
    "4": linkedCursors1,
    "5": linkedCursors1,
    "6": undefined,
    "7": undefined,
    "8": undefined,
    "9": undefined, // I believe this should be an invalid tag
    "10": undefined,
    "13": undefined,
    "15": undefined,
    "18": undefined,
    });

