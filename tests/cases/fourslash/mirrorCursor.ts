/// <reference path='fourslash.ts' />

// @Filename: /basic.tsx
////const jsx = (
////   <div/*0*/>
////   </div>
////);


// @Filename: /attrs.tsx
////const jsx = (
////   <div/*1*/ style={{ color: 'red' }}>
////      <p>
////         <img />
////      </p>
////   </div>
////);

// @Filename: /selfClosing.tsx
////const jsx = (
////   <div>
////      <p>
////         <img/*2*/ />
////      </p>
////   </div>
////);

// @Filename: /namespace.tsx
////const jsx = (
////    <someNamespa/*3*/ce.Thing>
////    </someNamespace.Thing>
////);

// @FileName: /invalid1.tsx
////const jsx = (
////    <div/*4*/>
////        <div>
////    </div>
////);

// @FileName: /invalid2.tsx
////const jsx = (
////    <div>
////        <div/*5*/>
////    </div>
////);

// @FileName: /fragment.tsx
////const jsx = (
////    </*6*/>
////        <img />
////    </>
////);

// @FileName: /mismatchedNames.tsx
////const A = thing;
////const B = thing;
////const jsx = (
////    </*7*/A>
////    </B>
////);

verify.jsxMirrorCursor( {
    "0": {ranges: {start: 28, end: 31}, wordPattern : 'div'},
    // [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 8},
    //         {startLine: 2, startCharacter: 6, endLine: 2, endCharacter: 9}],
    "1": {ranges: {start: 91, end: 94}, wordPattern : 'div'},
    // [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 8},
    //         {startLine: 5, startCharacter: 6, endLine: 5, endCharacter: 9}],
    "2": undefined,
    "3": {ranges: {start: 46, end: 65}, wordPattern : 'someNamespace.Thing'}, // FAILS
    //  [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 25},
    //         {startLine: 2, startCharacter: 6, endLine: 2, endCharacter: 26}],
    "4": undefined,
    "5": {ranges: {start: 44, end: 47}, wordPattern : 'div'},
    //  [{startLine: 2, startCharacter: 9, endLine: 2, endCharacter: 12},
    //         {startLine: 3, startCharacter: 6, endLine: 3, endCharacter: 9}],
    "6": {ranges: {start: 42, end: 42}, wordPattern : undefined}, // if you dont define wordpattern in 6, it has issues 
    //  [{startLine: 1, startCharacter: 5, endLine: 1, endCharacter: 5},
    //        {startLine: 3, startCharacter: 6, endLine: 3, endCharacter: 6}],
    "7": undefined,
    // "8": undefined,
})