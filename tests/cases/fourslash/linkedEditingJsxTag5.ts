/// <reference path='fourslash.ts' />

// @FileName: /unclosedElement.tsx
////const jsx = (
////    <div/*0*/>
////        <div/*1*/>
////    </div/*2*/>/*3*/
////);/*4*/

// @FileName: /mismatchedElement.tsx
////const jsx = (
////    /*5*/<div/*6*/>
////        </div/*7*/>
////    </*8*//div/*9*/>/*10*/
////);

// @Filename: /invalidClosing.tsx
////const jsx = (
////   <di/*11*/v>
////   </*12*/ //*13*/div>
////);

const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";

const startPos1 = test.markerByName("1").position - 3;
const endPos1 =  test.markerByName("2").position - 3;
const linkedCursors1 = {
    ranges: [{ start: startPos1, length: 3 }, { start: endPos1, length: 3 }],
    wordPattern,
};

const startPos2 = test.markerByName("6").position - 3;
const endPos2 =  test.markerByName("7").position - 3;
const linkedCursors2 = {
    ranges: [{ start: startPos2, length: 3 }, { start: endPos2, length: 3 }],
    wordPattern,
};

verify.linkedEditing( {
    "0": undefined,
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": undefined,
    "4": undefined,
    "5": undefined,
    "6": linkedCursors2,
    "7": linkedCursors2,
    "8": undefined,
    "9": undefined, 
    "10": undefined, 
    "11": undefined, // this tag does not parse as a closing tag
    "12": undefined,
    "13": undefined,
});