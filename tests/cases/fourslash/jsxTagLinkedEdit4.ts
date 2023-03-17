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
////   </di/*6*/v>
////);

const linkedCursors4 = {ranges: [{start: 18, end: 21}, 
                            {start: 69, end: 72}],
                        wordPattern : 'div'};

verify.jsxLinkedEdit( {
    "0": linkedCursors4,
    "1": linkedCursors4,
    "2": undefined,
    "3": undefined,
    "4": undefined,
    "5": undefined,
    "6": linkedCursors4, 
});