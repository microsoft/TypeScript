/// <reference path='fourslash.ts' />

// @Filename: /namespace.tsx
////const jsx = (
////    </*start*/someNamespa/*3*/ce./*2*/Thing>
////    <//*end*/someNamespace/*1*/.Thing>
////);

const startPos = test.markerByName("start").position;
const endPos =  test.markerByName("end").position;
const linkedCursors6 = {
    ranges: [{ start: startPos, length: 19 }, { start: endPos,  length: 19 }],
    wordPattern : 'someNamespace.Thing'
};

verify.jsxLinkedEdit( {
    "1": linkedCursors6,
    "2": linkedCursors6,
    "3": linkedCursors6,
});