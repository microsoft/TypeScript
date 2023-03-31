/// <reference path='fourslash.ts' />

// @Filename: /selfClosing.tsx
////const jsx = (
////   <div>/*0*/
////      <p>/*4*/
////         No lin/*9*/ked cursors here!
////         /*5*/</*1*/img/*2*/ /*3*//>
////     /*6*/ </p>/*8*/
////   /*7*/</div>
////);

verify.jsxLinkedEdit( {
    "0": undefined,
    "1": undefined,
    "2": undefined,
    "3": undefined,
    "4": undefined,
    "5": undefined,
    "6": undefined,
    "7": undefined,
    "8": undefined,
    "9": undefined,
});