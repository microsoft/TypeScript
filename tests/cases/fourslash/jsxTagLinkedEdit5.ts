/// <reference path='fourslash.ts' />

// @FileName: /invalid1.tsx
////const jsx = (
////    <div/*4*/>
////        <div/*5*/>
////    </div/*6*/>
////);

const linkedCursors5 = {ranges: [{start: 33, length: 3}, 
                            {start: 44, length: 3}],
                        wordPattern : 'div'};

verify.jsxLinkedEdit( {
    "4": undefined,
    "5": linkedCursors5,
    "6": linkedCursors5,
});