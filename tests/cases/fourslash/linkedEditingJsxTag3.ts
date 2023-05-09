/// <reference path='fourslash.ts' />

// @Filename: /selfClosing.tsx
/////*0*/const jsx = /*1*/(
////   <div> /*2*/
////      <p>/*3*/
////         No lin/*4*/ked cursors here!
////         /*5*/</*6*/img/*7*/ /*8*///*9*/>
////     /*10*/ </p>/*11*/
////   /*12*/</div>
/////*13*/)/*14*/;/*15*/

verify.linkedEditing( {
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
    "10": undefined,
    "11": undefined,
    "12": undefined,
    "13": undefined,
    "14": undefined,
    "15": undefined,
});