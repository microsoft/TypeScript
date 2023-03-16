/// <reference path='fourslash.ts' />

// @Filename: /attrs.tsx
////const jsx = (
////   </*0*/div/*1*/ /*5*/styl/*2*/e={{ color: 'red' }}/*6*/>/*4*/
////      <p>
////         <img />
////      </p>
////   </di/*3*/v>
////);

const linkedCursors2 = {ranges: [{start: 18, end: 21}, 
                                 {start: 91, end: 94}],
                        wordPattern : 'div'};

verify.jsxLinkedEdit( {
    "0": linkedCursors2,
    "1": linkedCursors2,
    "2": undefined,
    "3": linkedCursors2,
    "4": undefined,
    // "5": undefined, // if still a comment, case doesnt yet work !!!!
    "6": undefined,
});