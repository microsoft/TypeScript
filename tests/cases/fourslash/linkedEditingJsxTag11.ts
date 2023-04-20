/// <reference path='fourslash.ts' />

// for readability 
////const jsx = (
////   <div style={{ color: 'red' }}>
////      <p>
////         <img />
////      </p>
////   </div>
////);

// @Filename: /customElements.tsx
//// const jsx = </*1*/fbt/*2*/:en/*3*/um knownProp="accepted"
////     unknownProp="rejected">
//// </f/*4*/bt:e/*5*/num>;
////
//// const customElement = </*6*/custom/*7*/-element/*8*/></custom/*9*/-element>;
////
//// const standardElement = 
////    </*10*/Link/*11*/ href="/hello" passHref>
////        </*12*/But/*13*/ton component="a">
////            Next
////        </But/*14*/ton>
////    </Li/*15*/nk>;

const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";

const linkedCursors1 = {
    ranges: [{ start: test.markerByName("1").position, length: 8 }, { start: test.markerByName("4").position - 1, length: 8 }],
    wordPattern,
};
const linkedCursors2 = {
    ranges: [{ start: test.markerByName("6").position, length: 14 }, { start: test.markerByName("9").position - 6, length: 14 }],
    wordPattern,
};
const linkedCursors3 = {
    ranges: [{ start: test.markerByName("10").position, length: 4 }, { start: test.markerByName("15").position - 2, length: 4 }],
    wordPattern,
};
const linkedCursors4 = {
    ranges: [{ start: test.markerByName("12").position, length: 6 }, { start: test.markerByName("14").position - 3, length: 6 }],
    wordPattern,
};

verify.linkedEditing( {
    "1": linkedCursors1,
    "2": linkedCursors1,
    "3": linkedCursors1,
    "4": linkedCursors1,
    "5": linkedCursors1,
    "6": linkedCursors2,
    "7": linkedCursors2,
    "8": linkedCursors2,
    "9": linkedCursors2,
    "10": linkedCursors3,
    "11": linkedCursors3,
    "12": linkedCursors4,
    "13": linkedCursors4,
    "14": linkedCursors4,
    "15": linkedCursors3,
});