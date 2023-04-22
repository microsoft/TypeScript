/// <reference path='fourslash.ts' />

// @Filename: /jsx0.tsx
////const jsx = </*0*/>

// @Filename: /jsx1.tsx
////const jsx = <//*1*/>

// @Filename: /jsx2.tsx
////const jsx = </*2*/div>

// @Filename: /jsx3.tsx
////const jsx = <//*3*/div>

// @Filename: /jsx4.tsx
////const jsx = </*4*/div> <//*4a*/>;

// @Filename: /jsx5.tsx
////const jsx = </*5*/> <//*5a*/div>;

// @Filename: /jsx6.tsx
////const jsx = /*6*/div> <//*6a*/div>;

// @Filename: /jsx7.tsx
////const jsx = </*7*/div> //*7a*/div>;

// @Filename: /jsx8.tsx
////const jsx = </*8*/div <//*8a*/div>;

// @Filename: /jsx9.tsx
////const jsx = </*9*/div> <//*9a*/div;

// @Filename: /jsx10.tsx
////const jsx = </*10*/> <//*10a*/;

// @Filename: /jsx11.tsx
////const jsx = </*11*/ <//*11a*/>;

// @Filename: /jsx12.tsx
////const jsx = /*12*/> <//*12a*/>;

// @Filename: /jsx13.tsx
////const jsx = </*13*/> //*13a*/>;

// @Filename: /jsx14.tsx
////const jsx = </*14*/> </*14a*/div> <//*14b*/> <//*14c*/div>;

// @Filename: /jsx15.tsx
////const jsx = </*15*/div> </*15a*/> <//*15b*/div> <//*15c*/>;

const wordPattern =  "[a-zA-Z0-9:\\-\\._$]*";
const linkedCursors9 = {
    ranges: [{ start: test.markerByName("9").position, length: 3 }, { start:  test.markerByName("9a").position,  length: 3 }],
    wordPattern,
};

verify.linkedEditing( {
    "0": undefined,
    "1": undefined,
    "2": undefined, 
    "3": undefined,
    "4": undefined,
    "4a": undefined,
    "5": undefined,
    "5a": undefined,
    "6": undefined, 
    "6a": undefined,
    "7": undefined,
    "7a": undefined,
    "8": undefined, 
    "8a": undefined,
    "9": linkedCursors9,
    "9a": linkedCursors9,
    "10": undefined, 
    "10a": undefined,
    "11": undefined, 
    "11a": undefined,
    "12": undefined, 
    "12a": undefined,
    "13": undefined, 
    "13a": undefined,
    "14": undefined, 
    "14a": undefined,
    "14b": undefined, 
    "14c": undefined,
    "15": undefined, 
    "15a": undefined,
    "15b": undefined, 
    "15c": undefined,
});