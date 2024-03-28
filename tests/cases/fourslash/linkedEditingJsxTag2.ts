/// <reference path='fourslash.ts' />

// for readability 
////const jsx = (
////   <div style={{ color: 'red' }}>
////      <p>
////         <img />
////      </p>
////   </div>
////);

// @Filename: /attrs.tsx
////const jsx = (
////   </*0*/div/*1*/ /*2*/styl/*3*/e={{ color: 'red' }}/*4*/>/*5*/
////      <p>
////         <img />
////      </p>
////   </di/*6*/v>
////);

// this case is missing a closing brace in the attributes
// @Filename: /attrsError.tsx
////const jsx = (
////   </*10*/div/*11*/ /*12*/styl/*13*/e={{ color: 'red' }/*14*/>/*15*/
////         </*16*/p />
////   <//*17*/div>
////);

const startPos = test.markerByName("0").position;
const endPos =  test.markerByName("6").position - 2;
const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";
const linkedCursors = {
    ranges: [{ start: startPos, length: 3 }, { start: endPos, length: 3 }],
    wordPattern,
};

verify.linkedEditing( {
    "0": linkedCursors,
    "1": linkedCursors,
    "2": undefined,
    "3": undefined,
    "4": undefined,
    "5": undefined,
    "6": linkedCursors,
    "10": undefined,
    "11": undefined,
    "12": undefined,
    "13": undefined,
    "14": undefined,
    "15": undefined,
    "16": undefined,
});