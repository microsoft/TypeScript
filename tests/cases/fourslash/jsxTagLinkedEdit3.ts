/// <reference path='fourslash.ts' />

// @Filename: /selfClosing.tsx
////const jsx = (
////   <div>/*1*/
////      <p>/*4*/
////         /*5*/<img/*2*/ /*3*//>
////     /*6*/ </p>/*8*/
////   /*7*/</div>
////);

// const linkedCursors3 = {ranges: [{start: 18, end: 21}, 
//                                  {start: 91, end: 94}],
//                         wordPattern : 'div'};

verify.jsxLinkedEdit( {
    "1": undefined,
    "2": undefined,
    "3": undefined,
    "4": undefined,
    "5": undefined,
    "6": undefined,
    "7": undefined,
    "8": undefined,
});