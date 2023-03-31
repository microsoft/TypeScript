/// <reference path='fourslash.ts' />

// @FileName: /invalid1.tsx
////const jsx = (
////    <div/*0*/>
////        <div/*1*/>
////    </div/*2*/>
////);

const startPos = test.markerByName("1").position - 3;
const endPos =  test.markerByName("2").position - 3;
const linkedCursors = {
    ranges: [{ start: startPos, length: 3 }, { start: endPos, length: 3 }],
    wordPattern : 'div'
};

verify.linkedEditing( {
    "0": undefined,
    "1": linkedCursors,
    "2": linkedCursors,
});