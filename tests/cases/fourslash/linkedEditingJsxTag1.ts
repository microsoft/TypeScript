/// <reference path='fourslash.ts' />

// the content of basic.tsx
//const jsx = (
//   <div>
//   </div>
//);

// @Filename: /basic.tsx
/////*a*/const j/*b*/sx = (
////    /*c*/</*0*/d/*1*/iv/*2*/>/*3*/
////    </*4*///*5*/di/*6*/v/*7*/>/*8*/
////);
////const jsx2 = (
////    <d/*9*/iv>
////        <d/*10*/iv>
////            <p/*11*/>
////            <//*12*/p>        
////        </d/*13*/iv>
////    </d/*14*/iv>
////);/*d*/

// goTo.marker("a");

const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";
const linkedCursors1 = {
    ranges: [{ start: test.markerByName("0").position, length: 3 }, { start: test.markerByName("5").position, length: 3 }],
    wordPattern, 
};
const linkedCursors2 = {
    ranges: [{ start: test.markerByName("9").position - 1, length: 3 }, { start: test.markerByName("14").position - 1, length: 3 }],
    wordPattern,
};
const linkedCursors3 = {
    ranges: [{ start: test.markerByName("10").position - 1, length: 3 }, { start: test.markerByName("13").position - 1, length: 3 }],
    wordPattern,
};
const linkedCursors4 = {
    ranges: [{ start: test.markerByName("11").position - 1, length: 1 }, { start: test.markerByName("12").position, length: 1 }],
    wordPattern,
};

verify.linkedEditing( {
    "0": linkedCursors1,
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": undefined,
    "4": undefined,
    "5": linkedCursors1,
    "6": linkedCursors1,
    "7": linkedCursors1,
    "8": undefined,
    "9": linkedCursors2,
    "10": linkedCursors3,
    "11": linkedCursors4,
    "12": linkedCursors4,
    "13": linkedCursors3,
    "14": linkedCursors2,
    "a": undefined,
    "b": undefined,
    "c": undefined,
    "d": undefined,
});

