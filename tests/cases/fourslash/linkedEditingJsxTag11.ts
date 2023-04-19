/// <reference path='fourslash.ts' />

// for readability 
////const jsx = (
////   <div style={{ color: 'red' }}>
////      <p>
////         <img />
////      </p>
////   </div>
////);

// @Filename: /attrs.tsx
//// </*1*/fbt/*2*/:en/*3*/um knownProp="accepted"
////     unknownProp="rejected">
//// </f/*4*/bt:e/*5*/num>;


const startPos = test.markerByName("1").position;
const endPos =  test.markerByName("4").position - 1;
const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";
const linkedCursors = {
    ranges: [{ start: startPos, length: 8 }, { start: endPos, length: 8 }],
    wordPattern,
};

verify.linkedEditing( {
    "1": linkedCursors,
    "2": linkedCursors,
    "3": linkedCursors,
    "4": linkedCursors,
    "5": linkedCursors,
});