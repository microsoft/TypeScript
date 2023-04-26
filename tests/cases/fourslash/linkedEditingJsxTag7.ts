/// <reference path='fourslash.ts' />

// plaintext 
// const jsx = (
//     <>
//         <img />
//     </>
// );
// const jsx2 = (
//     /* this is comment */</* more comment */>Hello
//     </ /* even more comment */>
// );
// const jsx3 = (
//     <>
//     </>
// );

// @FileName: /fragment.tsx
/////*a*/const j/*b*/sx =/*c*/ (
////    /*5*/</*0*/>/*1*/
////        <img />
////    /*6*/</*2*///*3*/>/*4*/
////)/*d*/;
////const jsx2 = (
////    /* this is comment *//*13*/</*10*//* /*11*/more comment *//*12*/>/*8*/Hello/*9*/
////    <//*14*/ /*18*///*17*/* even/*15*/ more comment *//*16*/>
////);
////const jsx3 = (
////    <>/*7*/
////    </>
////);/*e*/

const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";

const startPos1 = test.markerByName("0").position;
const endPos1 =  test.markerByName("3").position;
const linkedCursors1 = {
    ranges: [{ start: startPos1, length: 0 }, { start: endPos1, length: 0 }],
    wordPattern,
};

const startPos2 = test.markerByName("10").position;
const endPos2 =  test.markerByName("14").position;
const linkedCursors2 = {
    ranges: [{ start: startPos2, length: 0 }, { start: endPos2, length: 0 }],
    wordPattern,
};

verify.linkedEditing({
    "0": linkedCursors1,
    "1": undefined,
    "2": undefined,
    "3": linkedCursors1,
    "4": undefined,
    "5": undefined,
    "6": undefined,
    "7": undefined,
    "8": undefined,
    "9": undefined,
    "10": linkedCursors2,
    "11": undefined,
    "12": undefined,
    "13": undefined,
    "14": linkedCursors2,
    "15": undefined,
    "16": undefined,
    "17": undefined,
    "18": undefined,
    "a": undefined,
    "b": undefined,
    "c": undefined,
    "d": undefined,
    "e": undefined,
}); 