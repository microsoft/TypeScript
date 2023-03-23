/// <reference path='fourslash.ts' />

// plaintext 
// const jsx = (
//     <>
//         <img />
//     </>
// );
// const jsx2 = (
//     <>
//     </>
// );
// const jsx3 = (
//     /* this is comment */</* more comment */>Hello
//     </ /* even more comment */>
// );

// @FileName: /fragment.tsx
////const jsx = (
////    /*5*/</*0*/>/*1*/
////        <img />
////    /*6*/</*2*///*3*/>/*4*/
////);
////const jsx2 = (
////    <>/*7*/
////    </>
////);
////const jsx3 = (
////    /* this is comment *//*13*/</*10*//* /*11*/more comment *//*12*/>/*8*/Hello/*9*/
////    <//*14*/ /*18*///*17*/* even/*15*/ more comment *//*16*/>
////);

// @FileName: /mismatchedFragment.tsx
////const jsx3 = (
////    </*A*/>
////        <div>
////    </>
////);

const linkedCursors7 = {ranges: [{start: 19, length: 0}, 
                            {start: 43, length: 0}],
                        wordPattern : undefined};

const linkedCursors7jsx3 = {ranges: [{start: 122, length: 0}, 
                            {start: 153, length: 0}],
                        wordPattern : undefined};

verify.jsxLinkedEdit({
    "0": linkedCursors7,
    "1": undefined,
    "2": undefined,
    "3": linkedCursors7,
    "4": undefined,
    "5": undefined,
    "6": undefined,
    "7": undefined,
    "8": undefined,
    "9": undefined,
    "10": linkedCursors7jsx3,
    "11": undefined,
    "12": undefined,
    "13": undefined,
    "14": linkedCursors7jsx3,
    "15": undefined,
    "16": undefined,
    "17": undefined,
    "18": undefined,
    // "A": undefined // I don't know what's supposed to happen in this case
}); 