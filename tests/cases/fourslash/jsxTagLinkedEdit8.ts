/// <reference path='fourslash.ts' />

// @FileName: /mismatchedNames.tsx
////const A = thing;
////const B = thing;
////const jsx = (
////    </*8*/A>
////    </B>
////);

// const linkedCursors8 = {ranges: [{start: 14, end: 14}, 
//                             {start: 43, end: 43}],
//                         wordPattern : };

verify.jsxLinkedEdit( {
    "8": undefined,
}); 