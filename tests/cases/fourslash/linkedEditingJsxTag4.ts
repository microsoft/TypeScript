/// <reference path='fourslash.ts' />

// for readability purposes
//const jsx = (
//   <div<T>>
//      <p>
//         <img />
//      </p>
//   </div>
//);

// @Filename: /typeTag.tsx
////const jsx = (
////   </*0*/div/*1*/</*2*/T/*3*/>/*4*/>/*5*/
////      <p>
////         <img />
////      </p>
////   <//*6*/div>
////);

// @Filename: /typeTagError.tsx
////const jsx = (
////   </*10*/div/*11*/</*12*/T/*13*/>/*14*/
////      </*15*/p />
////   <//*16*/div>
////);

const startPos = test.markerByName("0").position;
const endPos =  test.markerByName("6").position;
const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";
const linkedCursors = {
    ranges: [{ start: startPos, length: 3 }, { start: endPos, length: 3 }],
    wordPattern,
};

verify.linkedEditing( {
    "0": linkedCursors,
    "1": linkedCursors,
    "2": undefined,
    "3": undefined,
    "4": undefined,
    "5": undefined,
    "6": linkedCursors, 
    "10": undefined,
    "11": undefined,
    "12": undefined,
    "13": undefined,
    "14": undefined,
    "15": undefined,
    "16": undefined,
});