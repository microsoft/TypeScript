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
////const jsx = (
////   </*0*/div/*1*/ /*2*/styl/*3*/e={{ color: 'red' }}/*4*/>/*5*/
////      <p>
////         <img />
////      </p>
////   </di/*6*/v>
////);

const startPos = test.markerByName("0").position;
const endPos =  test.markerByName("6").position - 2;
const linkedCursors = {
    ranges: [{ start: startPos, length: 3 }, { start: endPos, length: 3 }],
    wordPattern : 'div'
};

verify.jsxLinkedEdit( {
    "0": linkedCursors,
    "1": linkedCursors,
    "2": undefined,
    "3": undefined,
    "4": undefined,
    "5": undefined,
    "6": linkedCursors,
});