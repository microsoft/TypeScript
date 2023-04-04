/// <reference path='fourslash.ts' />

// @Filename: /jsx1.tsx
////const jsx = </*0*/div> <//*1*/>;

// @Filename: /jsx2.tsx
////const jsx = </*2*/> <//*3*/div>;

// const startPos = test.markerByName("start").position;
// const endPos =  test.markerByName("end").position;
// const linkedCursors6 = {
//     ranges: [{ start: startPos, length: 19 }, { start: endPos,  length: 19 }],
// };

verify.linkedEditing( {
    "0": undefined,
    "1": undefined,
    // "2": undefined, these cases don't work yet 
    // "3": undefined,
});