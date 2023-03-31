/// <reference path='fourslash.ts' />

// the content of basic.tsx
//const jsx = (
//   <div>
//   </div>
//);

// @Filename: /basic.tsx
////const jsx = (
////    </*0*/d/*1*/iv/*2*/>/*3*/
////    </*4*///*5*/di/*6*/v/*7*/>/*8*/
////);

// @Filename: /whitespaceInvalidClosing.tsx
////const jsx = (
////   <div>
////   < /*9*/ /div>
////);

// @Filename: /whitespace.tsx
////const whitespaceOpening = (
////   </*10*/ /*11*/div/*12*/ /*13*/> /*14*/
////   <//*15*/di/*16*/v>
////);
////const whitespaceClosing = (
////   </*17*/di/*18*/v>
////   <//*19*/ /*20*/div/*21*/ /*22*/> /*23*/
////);

const markers = test.markers();
const linkedCursors1 = {
    ranges: [{ start: markers[0].position, length: 3 }, { start: markers[5].position, length: 3 }],
    wordPattern: 'div'
};
const linkedCursors2 = {
    ranges: [{ start: markers[11].position, length: 3 }, { start: markers[15].position, length: 3 }],
    wordPattern: 'div'
};
const linkedCursors3 = {
    ranges: [{ start: markers[17].position, length: 3 }, { start: markers[20].position, length: 3 }],
    wordPattern: 'div'
};

verify.jsxLinkedEdit( {
    "0": linkedCursors1,
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": undefined,
    "4": undefined,
    "5": linkedCursors1,
    "6": linkedCursors1,
    "7": linkedCursors1,
    "8": undefined,
    "9": undefined, // I believe this should be an invalid tag
    "10": undefined,
    "11": linkedCursors2,
    "12": linkedCursors2,
    "13": undefined,
    "14": undefined,
    "15": linkedCursors2,
    "16": linkedCursors2,
    "17": linkedCursors3,
    "18": linkedCursors3,
    "19": undefined,
    "20": linkedCursors3,
    "21": linkedCursors3,
    "22": undefined,
    "23": undefined,
    });

