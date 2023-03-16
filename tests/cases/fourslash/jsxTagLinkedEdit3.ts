/// <reference path='fourslash.ts' />

// @Filename: /selfClosing.tsx
////const jsx = (
////   <div>
////      <p>
////         <img/*2*/ />
////      </p>
////   </div>
////);

// const linkedCursors3 = {ranges: [{start: 18, end: 21}, 
//                                  {start: 91, end: 94}],
//                         wordPattern : 'div'};

verify.jsxLinkedEdit( {
    "2": undefined,
});