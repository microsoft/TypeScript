/// <reference path='fourslash.ts' />

// the content of whitespace.tsx
//const whitespaceOpening = (
//   < div > 
//   </div>
//);
//const whitespaceClosing = (
//   </div>
//   </ div >
//);
//const triviaOpening = (
//    /* this is comment */</* more comment */ div /* comments */>Hello
//    </ /* even more comment */ div /* bye */>
//);

// @Filename: /whitespace.tsx
////const whitespaceOpening = (
////   </*0*/ /*1*/div/*2*/ /*3*/> /*4*/
////   <//*5*/di/*6*/v>
////);
////const whitespaceClosing = (
////   </*7*/di/*8*/v>
////   <//*9*/ /*10*/div/*11*/ /*12*/> /*13*/
////);
////const triviaOpening = (
////    /* this is/*14*/ comment *//*15*/</*16*//* /*17*/more/*18*/ comment *//*19*/ di/*20*/v /* comments */>/*21*/Hello/*22*/
////    <//*23*/ /*24*///*25*/* even/*26*/ more comment *//*27*/ d/*28*/iv /* b/*29*/ye */>
////);

const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";

const markers = test.markers();
const linkedCursors1 = {
    ranges: [{ start: markers[1].position, length: 3 }, { start: markers[5].position, length: 3 }],
    wordPattern,
};
const linkedCursors2 = {
    ranges: [{ start: markers[7].position, length: 3 }, { start: markers[10].position, length: 3 }],
    wordPattern,
};
const linkedCursors3 = {
    ranges: [{ start: markers[20].position - 2, length: 3 }, { start: markers[28].position - 1, length: 3 }],
    wordPattern,
};

verify.linkedEditing( {
    "0": undefined,
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": undefined,
    "4": undefined,
    "5": linkedCursors1,
    "6": linkedCursors1,
    "7": linkedCursors2,
    "8": linkedCursors2,
    "9": undefined,
    "10": linkedCursors2,
    "11": linkedCursors2,
    "12": undefined,
    "13": undefined,
    "14": undefined,
    "15": undefined,
    "16": undefined,
    "17": undefined,
    "18": undefined,
    "19": undefined,
    "20": linkedCursors3,
    "21": undefined,
    "22": undefined,
    "23": undefined,
    "24": undefined,
    "25": undefined,
    "26": undefined,
    "27": undefined,
    "28": linkedCursors3,
    "29": undefined
});

