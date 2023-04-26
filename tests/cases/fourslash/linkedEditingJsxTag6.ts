/// <reference path='fourslash.ts' />

// @Filename: /namespace.tsx
////const jsx = (
////    </*start*/someNamespa/*3*/ce./*2*/Thing>
////    <//*end*/someNamespace/*1*/.Thing>
////);
//// const jsx1 = </*4*/foo/*5*/  /*6*/./*7*/ /*8*/ba/*9*/r><//*10*/foo.bar>;
//// const jsx2 = <foo./*11*/bar><//*12*/ /*13*/f/*14*/oo /*15*/./*16*/b/*17*/ar/*18*/>;
//// const jsx3 = </*19*/foo/*20*/ //*21*// /*22*/some comment
////     /*23*/./*24*/bar>
////     </f/*25*/oo.bar>;
//// let jsx4 =
////     </*26*/foo  /*27*/ .// hi/*28*/
////     /*29*/bar>
////     <//*30*/foo  /*31*/ .// hi/*32*/
////     /*33*/bar>

const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";

const startPos1 = test.markerByName("start").position;
const endPos1 =  test.markerByName("end").position;
const linkedCursors1 = {
    ranges: [{ start: startPos1, length: 19 }, { start: endPos1,  length: 19 }],
    wordPattern,
};

const startPos2 = test.markerByName("26").position;
const endPos2 =  test.markerByName("30").position;
const linkedCursors2 = {
    ranges: [{ start: startPos2, length: 21 }, { start: endPos2,  length: 21 }],
    wordPattern,
};

verify.linkedEditing( {
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": linkedCursors1,
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
    "16": undefined,
    "17": undefined,
    "18": undefined,
    "19": undefined,
    "20": undefined,
    "21": undefined,
    "22": undefined,
    "23": undefined,
    "24": undefined,
    "25": undefined,
    "26": linkedCursors2,
    "27": linkedCursors2,
    "28": linkedCursors2,
    "29": linkedCursors2,
    "30": linkedCursors2,
    "31": linkedCursors2,
    "32": linkedCursors2,
    "33": linkedCursors2,
});